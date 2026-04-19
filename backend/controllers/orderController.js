const Order = require('../models/Order');
const Product = require('../models/Product');

// Middleware to validate order data
exports.validateOrder = async (req, res, next) => {
    try {
        const { items, shippingAddress, payment } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order must contain at least one item' });
        }

        // Validate each item
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({ error: `Product ${item.product} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for ${product.name}. Available: ${product.stock}`
                });
            }
        }

        next();
    } catch (error) {
        console.error('Order validation error:', error);
        res.status(500).json({ error: 'Order validation failed' });
    }
};

// Get user's orders
exports.getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const userId = req.user?.id || 'demo-user'; // In production, get from JWT

        const filter = { user: userId };
        if (status) filter.status = status;

        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([
            Order.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('items.product', 'name images'),
            Order.countDocuments(filter)
        ]);

        res.json({
            success: true,
            orders,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get single order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email company')
            .populate('items.product', 'name images price');

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check ownership (in production)
        // if (order.user._id.toString() !== req.user.id) {
        //   return res.status(403).json({ error: 'Not authorized' });
        // }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, billingAddress, payment, notes } = req.body;

        // Calculate item details and update stock
        const orderItems = [];
        let subtotal = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) continue;

            const itemPrice = product.discountedPrice || product.price;
            const itemSubtotal = itemPrice * item.quantity;

            orderItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: itemPrice,
                subtotal: itemSubtotal
            });

            subtotal += itemSubtotal;

            // Update stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Calculate totals (simplified)
        const tax = subtotal * 0.1; // 10% tax
        const shipping = 0; // Free shipping for B2B
        const discount = 0;
        const total = subtotal + tax + shipping - discount;

        // Create order
        const order = new Order({
            user: 'demo-user-id', // In production, get from JWT
            items: orderItems,
            subtotal,
            tax,
            shipping,
            discount,
            total,
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            payment,
            notes,
            status: 'pending'
        });

        await order.save();

        res.status(201).json({
            success: true,
            order,
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updateData = { status };

        // Set timestamps based on status
        if (status === 'cancelled') {
            updateData.cancelledAt = new Date();
        } else if (status === 'delivered') {
            updateData.deliveredAt = new Date();
        } else if (status === 'shipped') {
            updateData.estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 days
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            success: true,
            order,
            message: `Order status updated to ${status}`
        });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

// Get order statistics
exports.getOrderStats = async (req, res) => {
    try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const [
            totalOrders,
            pendingOrders,
            totalRevenue,
            monthlyRevenue,
            yearlyRevenue
        ] = await Promise.all([
            Order.countDocuments(),
            Order.countDocuments({ status: 'pending' }),
            Order.aggregate([
                { $match: { status: { $in: ['delivered', 'paid'] } } },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ]),
            Order.aggregate([
                {
                    $match: {
                        status: { $in: ['delivered', 'paid'] },
                        createdAt: { $gte: startOfMonth }
                    }
                },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ]),
            Order.aggregate([
                {
                    $match: {
                        status: { $in: ['delivered', 'paid'] },
                        createdAt: { $gte: startOfYear }
                    }
                },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ])
        ]);

        res.json({
            success: true,
            stats: {
                totalOrders,
                pendingOrders,
                totalRevenue: totalRevenue[0]?.total || 0,
                monthlyRevenue: monthlyRevenue[0]?.total || 0,
                yearlyRevenue: yearlyRevenue[0]?.total || 0
            }
        });
    } catch (error) {
        console.error('Get order stats error:', error);
        res.status(500).json({ error: 'Failed to fetch order statistics' });
    }
};