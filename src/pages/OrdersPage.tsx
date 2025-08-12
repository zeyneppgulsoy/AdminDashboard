import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, Search, Filter, Eye, Package, Truck, CheckCircle, Clock, User, DollarSign } from 'lucide-react'
import { useStore } from '@/store/useStore'

// Helper function to get status info
const getStatusInfo = (total: number) => {
  if (total > 2000) return { status: 'Delivered', color: 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300', icon: CheckCircle }
  if (total > 1000) return { status: 'Shipped', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-300', icon: Truck }
  if (total > 500) return { status: 'Processing', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-300', icon: Package }
  return { status: 'Pending', color: 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300', icon: Clock }
}

export default function OrdersPage() {
  const { carts, users, fetchCarts } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(false)

  // Remove auto-fetch to prevent automatic loading
  // useEffect(() => {
  //   loadAllData()
  // }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      await fetchCarts()
    } finally {
      setLoading(false)
    }
  }

  // Process orders with enriched data
  const enrichedOrders = carts.map(cart => {
    const user = users.find(u => u.id === cart.userId)
    const total = cart.products.reduce((sum, item) => {
      // Use cart item's own price data
      return sum + (item.price * item.quantity)
    }, 0)
    
    const statusInfo = getStatusInfo(total)
    
    return {
      ...cart,
      user,
      total,
      itemCount: cart.products.reduce((sum, item) => sum + item.quantity, 0),
      statusInfo
    }
  })

  // Filter orders
  const filteredOrders = enrichedOrders.filter(order => {
    const matchesSearch = 
      order.id.toString().includes(searchQuery) ||
      order.userId.toString().includes(searchQuery) ||
      order.user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.statusInfo.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  if (carts.length === 0 && !loading) {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
            <p className="text-muted-foreground">Click "Load Orders" to fetch order data</p>
          </div>
          <Button onClick={loadAllData} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Load Orders
          </Button>
        </div>

        {/* Empty state */}
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4">No Orders Loaded</h3>
              <Button onClick={loadAllData} className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Load Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
          <p className="text-muted-foreground">
            Track and manage customer orders ({filteredOrders.length} orders)
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={loadAllData} variant="outline" disabled={loading}>
            {loading ? 'Loading...' : 'Reload Orders'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{enrichedOrders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${enrichedOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">
                  {enrichedOrders.filter(o => o.statusInfo.status === 'Processing').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold">
                  {enrichedOrders.filter(o => o.statusInfo.status === 'Delivered').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders by ID, customer ID, name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = order.statusInfo.icon
            return (
              <Card key={order.id} className="hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  {/* Modern Order Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{order.itemCount}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Order #{order.id}</h3>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${order.statusInfo.color}`}>
                            <StatusIcon className="h-4 w-4" />
                            {order.statusInfo.status}
                          </div>
                        </div>
                        {order.user && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{`${order.user.firstName} ${order.user.lastName}`}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm">{order.user.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Price Section */}
                    <div className="text-right bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Modern Products Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-600" />
                        Order Items ({order.products.length})
                      </h4>
                      {order.products.length > 3 && (
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          Showing 3 of {order.products.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {order.products.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">#{item.id}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Product #{item.id}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                      
                      {order.products.length > 3 && (
                        <div className="flex items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800">
                          <span className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                            +{order.products.length - 3} more items
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modern Footer */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Order placed • {order.itemCount} items total
                    </div>
                    <Button size="sm" variant="outline" className="gap-1 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20">
                      <Eye className="h-3 w-3" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
