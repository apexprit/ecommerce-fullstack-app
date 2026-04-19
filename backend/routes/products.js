const express = require('express');
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', productController.getProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', productController.getProduct);

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', productController.getFeaturedProducts);

// @route   GET /api/products/categories
// @desc    Get all categories with counts
// @access  Public
router.get('/categories', productController.getCategories);

// @route   POST /api/products
// @desc    Create new product (admin only)
// @access  Private
router.post('/', validateProduct, productController.createProduct);

// @route   PUT /api/products/:id
// @desc    Update product (admin only)
// @access  Private
router.put('/:id', validateProduct, productController.updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product (admin only)
// @access  Private
router.delete('/:id', productController.deleteProduct);

module.exports = router;