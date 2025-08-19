// DummyJSON API Service - Much richer data for e-commerce admin
const BASE_URL = 'https://dummyjson.com'

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: {
    color: string
    type: string
  }
  ip: string
  address: {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
    country: string
  }
  macAddress: string
  university: string
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company: {
    department: string
    name: string
    title: string
    address: {
      address: string
      city: string
      state: string
      stateCode: string
      postalCode: string
      coordinates: {
        lat: number
        lng: number
      }
      country: string
    }
  }
  ein: string
  ssn: string
  userAgent: string
  crypto: {
    coin: string
    wallet: string
    network: string
  }
  role: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
}

export interface Cart {
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

// DummyJSON API Response interfaces
interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

interface CartsResponse {
  carts: Cart[]
  total: number
  skip: number
  limit: number
}

// API Functions with DummyJSON endpoints
export const api = {
  // Users (we'll use as store owners/customers)
  getUsers: async (limit: number = 30): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users?limit=${limit}`)
    const data: UsersResponse = await response.json()
    return data.users
  },

  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`)
    return response.json()
  },

  // Products
  getProducts: async (limit: number = 30): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`)
    const data: ProductsResponse = await response.json()
    return data.products
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    return response.json()
  },

  // Categories (DummyJSON provides different endpoint)
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`)
    return response.json()
  },

  // Carts (orders)
  getCarts: async (limit: number = 20): Promise<Cart[]> => {
    const response = await fetch(`${BASE_URL}/carts?limit=${limit}`)
    const data: CartsResponse = await response.json()
    return data.carts
  },

  // Delete operations (DummyJSON supports fake CRUD)
  deleteUser: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE'
    })
    return response.json()
  },

  deleteProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE'
    })
    return response.json()
  },

  // Search functions (DummyJSON has great search capabilities)
  searchUsers: async (query: string): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users/search?q=${query}`)
    const data: UsersResponse = await response.json()
    return data.users
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`)
    const data: ProductsResponse = await response.json()
    return data.products
  },

  // Dashboard specific functions
  getRecentOrders: async (limit: number = 5): Promise<Cart[]> => {
    const response = await fetch(`${BASE_URL}/carts?limit=${limit}`)
    const data: CartsResponse = await response.json()
    return data.carts
  },

  getDashboardStats: async () => {
    const [users, products, carts] = await Promise.all([
      fetch(`${BASE_URL}/users?limit=0`).then(r => r.json()),
      fetch(`${BASE_URL}/products?limit=0`).then(r => r.json()),
      fetch(`${BASE_URL}/carts?limit=0`).then(r => r.json())
    ])
    
    return {
      totalUsers: users.total,
      totalProducts: products.total,
      totalOrders: carts.total,
      recentCarts: carts.carts.slice(0, 5)
    }
  }
}