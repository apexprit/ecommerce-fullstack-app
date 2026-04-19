const Joi = require('joi');

// Validation schemas
const authSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    company: Joi.object({
        name: Joi.string().optional(),
        vatNumber: Joi.string().optional(),
        address: Joi.string().optional()
    }).optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const productSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().min(10).max(2000).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid('software', 'consulting', 'training', 'support', 'hardware').required(),
    subcategory: Joi.string().optional(),
    stock: Joi.number().min(0).required(),
    sku: Joi.string().optional(),
    images: Joi.array().items(Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().optional(),
        isPrimary: Joi.boolean().optional()
    })).optional(),
    features: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    })).optional(),
    specifications: Joi.object().optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
    rating: Joi.object({
        average: Joi.number().min(0).max(5).optional(),
        count: Joi.number().min(0).optional()
    }).optional(),
    discount: Joi.object({
        percentage: Joi.number().min(0).max(100).optional(),
        expiresAt: Joi.date().optional()
    }).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    vendor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional()
});

const orderSchema = Joi.object({
    items: Joi.array().items(Joi.object({
        product: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        quantity: Joi.number().min(1).required()
    })).min(1).required(),
    shippingAddress: Joi.object({
        name: Joi.string().required(),
        company: Joi.string().optional(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.string().optional()
    }).required(),
    billingAddress: Joi.object({
        name: Joi.string().optional(),
        company: Joi.string().optional(),
        street: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        postalCode: Joi.string().optional(),
        country: Joi.string().optional()
    }).optional(),
    payment: Joi.object({
        method: Joi.string().valid('credit_card', 'paypal', 'bank_transfer', 'invoice').required(),
        status: Joi.string().valid('pending', 'authorized', 'paid', 'failed', 'refunded').optional(),
        transactionId: Joi.string().optional(),
        paidAt: Joi.date().optional()
    }).required(),
    notes: Joi.string().optional()
});

// Validation middleware factory
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ error: 'Validation failed', details: errors });
        }
        next();
    };
};

module.exports = {
    validateAuth: validate(authSchema),
    validateLogin: validate(loginSchema),
    validateProduct: validate(productSchema),
    validateOrderSchema: validate(orderSchema)
};