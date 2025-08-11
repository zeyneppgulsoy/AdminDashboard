import { create } from 'zustand'
import type { User, Product } from '@/services/api'
import { api } from '@/services/api'

// Cart interface'ini burada tanımlayalım (geçici çözüm)
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

interface StoreState {
  // Data
  users: User[]
  products: Product[]
  carts: Cart[]
  categories: string[]
  
  // Loading states
  isLoading: boolean
  usersLoading: boolean
  productsLoading: boolean
  
  // Actions
  fetchUsers: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchCarts: () => Promise<void>
  fetchCategories: () => Promise<void>
  deleteUser: (id: number) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  
  // Analytics (derived data)
  getAnalytics: () => {
    totalUsers: number
    totalProducts: number
    totalOrders: number
    totalRevenue: number
    activeStores: number
  }
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  users: [],
  products: [],
  carts: [],
  categories: [],
  
  isLoading: false,
  usersLoading: false,
  productsLoading: false,
  
  // Fetch Users (as Store Owners)
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
  
  // Fetch Products
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
  
  // Fetch Carts (Orders)
  fetchCarts: async () => {
    try {
      const carts = await api.getCarts()
      set({ carts })
    } catch (error) {
      console.error('Error fetching carts:', error)
    }
  },
  
  // Fetch Categories
  fetchCategories: async () => {
    try {
      const categories = await api.getCategories()
      set({ categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  },
  
  // Delete User
  deleteUser: async (id: number) => {
    try {
      await api.deleteUser(id)
      const users = get().users.filter(user => user.id !== id)
      set({ users })
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  },
  
  // Delete Product
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
