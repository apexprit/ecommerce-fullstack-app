const express = require('express');
const orderController = require('../controllers/orderController');
const { validateOrderSchema } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', orderController.getOrders);

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', orderController.getOrder);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', validateOrderSchema, orderController.validateOrder, orderController.createOrder);

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (admin)
router.put('/:id/status', orderController.updateOrderStatus);

// @route   GET /api/orders/stats/summary
// @desc    Get order statistics
// @access  Private (admin)
router.get('/stats/summary', orderController.getOrderStats);

module.exports = router;