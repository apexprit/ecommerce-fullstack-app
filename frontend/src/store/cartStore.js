import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartService } from '../services/api'

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: cartService.getCart(),
            itemCount: cartService.getItemCount(),
            total: cartService.getCartTotal(),

            addItem: (product, quantity = 1) => {
                const updatedCart = cartService.addToCart(product, quantity)
                set({
                    items: updatedCart,
                    itemCount: cartService.getItemCount(),
                    total: cartService.getCartTotal(),
                })
            },

            removeItem: (productId) => {
                const updatedCart = cartService.removeFromCart(productId)
                set({
                    items: updatedCart,
                    itemCount: cartService.getItemCount(),
                    total: cartService.getCartTotal(),
                })
            },

            updateQuantity: (productId, quantity) => {
                const updatedCart = cartService.updateQuantity(productId, quantity)
                set({
                    items: updatedCart,
                    itemCount: cartService.getItemCount(),
                    total: cartService.getCartTotal(),
                })
            },

            clearCart: () => {
                cartService.clearCart()
                set({
                    items: [],
                    itemCount: 0,
                    total: 0,
                })
            },

            getItemQuantity: (productId) => {
                const cart = get().items
                const item = cart.find(item => item.product._id === productId)
                return item ? item.quantity : 0
            },

            // Check if product is in cart
            isInCart: (productId) => {
                const cart = get().items
                return cart.some(item => item.product._id === productId)
            },

            // Calculate subtotal, tax, shipping, etc.
            calculateSummary: () => {
                const cart = get().items
                const subtotal = cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                )
                const tax = subtotal * 0.1 // 10% tax
                const shipping = subtotal > 100 ? 0 : 9.99
                const total = subtotal + tax + shipping

                return {
                    subtotal: parseFloat(subtotal.toFixed(2)),
                    tax: parseFloat(tax.toFixed(2)),
                    shipping: parseFloat(shipping.toFixed(2)),
                    total: parseFloat(total.toFixed(2)),
                }
            },
        }),
        {
            name: 'cart-storage', // name of the item in localStorage
            getStorage: () => localStorage,
        }
    )
)