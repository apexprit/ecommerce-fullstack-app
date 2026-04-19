import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// Auth services
export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getCurrentUser: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
}

// Product services
export const productService = {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    getFeatured: () => api.get('/products/featured'),
    getCategories: () => api.get('/products/categories'),
    create: (productData) => api.post('/products', productData),
    update: (id, productData) => api.put(`/products/${id}`, productData),
    delete: (id) => api.delete(`/products/${id}`),
}

// Order services
export const orderService = {
    getAll: (params) => api.get('/orders', { params }),
    getById: (id) => api.get(`/orders/${id}`),
    create: (orderData) => api.post('/orders', orderData),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
    getStats: () => api.get('/orders/stats/summary'),
}

// Cart services (local storage based)
export const cartService = {
    getCart: () => {
        const cart = localStorage.getItem('cart')
        return cart ? JSON.parse(cart) : []
    },

    addToCart: (product, quantity = 1) => {
        const cart = cartService.getCart()
        const existingItem = cart.find(item => item.product._id === product._id)

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.push({
                product,
                quantity,
                price: product.discountedPrice || product.price,
                addedAt: new Date().toISOString()
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        return cart
    },

    removeFromCart: (productId) => {
        const cart = cartService.getCart()
        const updatedCart = cart.filter(item => item.product._id !== productId)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        return updatedCart
    },

    updateQuantity: (productId, quantity) => {
        const cart = cartService.getCart()
        const item = cart.find(item => item.product._id === productId)

        if (item) {
            if (quantity <= 0) {
                return cartService.removeFromCart(productId)
            }
            item.quantity = quantity
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        return cart
    },

    clearCart: () => {
        localStorage.removeItem('cart')
        return []
    },

    getCartTotal: () => {
        const cart = cartService.getCart()
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    },

    getItemCount: () => {
        const cart = cartService.getCart()
        return cart.reduce((count, item) => count + item.quantity, 0)
    }
}

export default api