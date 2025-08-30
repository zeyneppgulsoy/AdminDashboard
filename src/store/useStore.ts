import { create } from 'zustand'
import type { User, Product } from '@/services/api'
import { api } from '@/services/api'


interface Cart {
  id: number
  products: Array<{
    id: number
    title: string
    price: number
    quantity: number
    total: number
    discountPercentage: number
    discountedTotal: number
    thumbnail: string
  }>
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

// Defines the shape of the Zustand store, including state and actions
interface StoreState {
  // State properties
  users: User[]
  stores: User[]  // Separate array for stores
  products: Product[]
  carts: Cart[]
  categories: string[]
  
  // Loading indicators for UI feedback
  isLoading: boolean
  usersLoading: boolean
  storesLoading: boolean
  productsLoading: boolean
  
  // Actions to interact with the API and update state
  fetchUsers: () => Promise<void>
  fetchStores: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchCarts: () => Promise<void>
  fetchCategories: () => Promise<void>
  deleteUser: (id: number) => Promise<void>
  deleteStore: (id: number) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  
  // Selector for deriving analytics data from the state
  getAnalytics: () => {
    totalUsers: number
    totalProducts: number
    totalOrders: number
    totalRevenue: number
    activeStores: number
  }
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial state values
  users: [],
  stores: [],
  products: [],
  carts: [],
  categories: [],
  
  isLoading: false,
  usersLoading: false,
  storesLoading: false,
  productsLoading: false,
  
  // Fetches all users from the API
  fetchUsers: async () => {
    set({ usersLoading: true })
    try {
      const users = await api.getUsers()
      set({ users, usersLoading: false })
    } catch (error) {
      console.error('Error fetching users:', error)
      set({ usersLoading: false })
    }
  },

  // Fetches users to be treated as stores
  fetchStores: async () => {
    set({ storesLoading: true })
    try {
      const users = await api.getUsers()
      set({ stores: users, storesLoading: false })
    } catch (error) {
      console.error('Error fetching stores:', error)
      set({ storesLoading: false })
    }
  },
  
  // Fetches all products from the API
  fetchProducts: async () => {
    set({ productsLoading: true })
    try {
      const products = await api.getProducts()
      set({ products, productsLoading: false })
    } catch (error) {
      console.error('Error fetching products:', error)
      set({ productsLoading: false })
    }
  },
  
  // Fetches all carts, representing orders
  fetchCarts: async () => {
    try {
      const carts = await api.getCarts()
      set({ carts })
    } catch (error) {
      console.error('Error fetching carts:', error)
    }
  },
  
  // Fetches all product categories
  fetchCategories: async () => {
    try {
      const categories = await api.getCategories()
      set({ categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  },
  
  // Deletes a user and optimistically updates the state
  deleteUser: async (id: number) => {
    try {
      await api.deleteUser(id)
      const users = get().users.filter(user => user.id !== id)
      set({ users })
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  },

  // Deletes a store and optimistically updates the state
  deleteStore: async (id: number) => {
    try {
      await api.deleteUser(id)
      const stores = get().stores.filter(store => store.id !== id)
      set({ stores })
    } catch (error) {
      console.error('Error deleting store:', error)
    }
  },
  
  // Deletes a product and optimistically updates the state
  deleteProduct: async (id: number) => {
    try {
      await api.deleteProduct(id)
      const products = get().products.filter(product => product.id !== id)
      set({ products })
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  },

  // Analytics calculations
  getAnalytics: () => {
    const { users, products, carts } = get()
    
    return {
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: carts.length,
      totalRevenue: products.reduce((sum, product) => sum + product.price, 0),
      activeStores: Math.min(users.length, 15) // Mock active stores
    }
  }
}))