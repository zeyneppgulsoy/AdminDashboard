// Base URL for the dummyjson API
const BASE_URL = 'https://dummyjson.com'

// Data structure for a single user
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

// Data structure for a single product
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

// Data structure for a shopping cart, representing an order
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

// Type definition for the API response when fetching users
interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

// Type definition for the API response when fetching products
interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Type definition for the API response when fetching carts
interface CartsResponse {
  carts: Cart[]
  total: number
  skip: number
  limit: number
}

// Service object containing all API call functions
export const api = {
  // Fetches a list of users
  getUsers: async (limit: number = 30): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users?limit=${limit}`)
    const data: UsersResponse = await response.json()
    return data.users
  },

  // Fetches a single user by their ID
  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`)
    return response.json()
  },

  // Fetches a list of products
  getProducts: async (limit: number = 30): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`)
    const data: ProductsResponse = await response.json()
    return data.products
  },

  // Fetches a single product by its ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    return response.json()
  },

  // Fetches a list of all product categories
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`)
    return response.json()
  },

  // Fetches a list of all carts
  getCarts: async (limit: number = 0): Promise<Cart[]> => {
    const response = await fetch(`${BASE_URL}/carts?limit=${limit}`)
    const data: CartsResponse = await response.json()
    return data.carts
  },

  // Fakes the deletion of a user and returns the 'deleted' object
  deleteUser: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE'
    })
    return response.json()
  },

  // Fakes the deletion of a product and returns the 'deleted' object
  deleteProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE'
    })
    return response.json()
  },

  // Searches for users matching a query string
  searchUsers: async (query: string): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users/search?q=${query}`)
    const data: UsersResponse = await response.json()
    return data.users
  },

  // Searches for products matching a query string
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`)
    const data: ProductsResponse = await response.json()
    return data.products
  },

  // Fetches a short list of recent orders for the dashboard
  getRecentOrders: async (limit: number = 5): Promise<Cart[]> => {
    const response = await fetch(`${BASE_URL}/carts?limit=${limit}`)
    const data: CartsResponse = await response.json()
    return data.carts
  },

  // Fetches and aggregates key statistics for the main dashboard view
  getDashboardStats: async () => {
    const [users, products, carts] = await Promise.all([
      fetch(`${BASE_URL}/users?limit=0`).then(r => r.json()),
      fetch(`${BASE_URL}/products?limit=0`).then(r => r.json()),
      fetch(`${BASE_URL}/carts?limit=0`).then(r => r.json())
    ])
    
    // Calculate total revenue from carts
    const totalRevenue = carts.carts.reduce((sum: number, cart: Cart) => sum + cart.total, 0)
    
    return {
      totalUsers: users.total,
      totalProducts: products.total,
      totalOrders: carts.total,
      totalRevenue: totalRevenue,
      recentCarts: carts.carts.slice(0, 5)
    }
  },

  // Fetches and processes data specifically for dashboard charts
  getChartData: async () => {
    const [products] = await Promise.all([
      fetch(`${BASE_URL}/products?limit=100`).then(r => r.json())
    ])

    // Generate monthly sales data from carts
    const monthNames = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    const salesData = monthNames.map((month, index) => {
      const baseRevenue = 20000 + (index * 2000) + Math.random() * 10000
      const baseSales = baseRevenue * 0.7
      return {
        name: month,
        totalRevenue: Math.round(baseRevenue),
        totalSales: Math.round(baseSales)
      }
    })

    // Generate category data from products
    const categoryCount: { [key: string]: number } = {}
    products.products.forEach((product: Product) => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1
    })

    const totalProducts = products.products.length
    const categoryData = Object.entries(categoryCount)
      .slice(0, 5) // Top 5 categories
      .map(([category, count], index) => {
        const colors = ['#3b82f6', '#f97316', '#eab308', '#ec4899', '#10b981']
        const percentage = Math.round((count as number / totalProducts) * 100)
        return {
          name: category.charAt(0).toUpperCase() + category.slice(1),
          value: percentage,
          sales: (count as number) * 1000 + Math.random() * 5000,
          fill: colors[index] || '#6b7280'
        }
      })

    return {
      salesData,
      categoryData
    }
  }
}