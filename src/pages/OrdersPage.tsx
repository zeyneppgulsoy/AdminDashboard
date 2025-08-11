import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Search, Filter, Eye, Package, Truck, CheckCircle, Clock, User, DollarSign } from 'lucide-react'
import { useStore } from '@/store/useStore'

// Helper function to get status info
const getStatusInfo = (total: number) => {
  if (total > 2000) return { status: 'Delivered', color: 'text-green-600 bg-green-50', icon: CheckCircle }
  if (total > 1000) return { status: 'Shipped', color: 'text-blue-600 bg-blue-50', icon: Truck }
  if (total > 500) return { status: 'Processing', color: 'text-yellow-600 bg-yellow-50', icon: Package }
  return { status: 'Pending', color: 'text-gray-600 bg-gray-50', icon: Clock }
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
              <h3 className="text-lg font-semibold mb-2">No Orders Loaded</h3>
              <p className="text-muted-foreground mb-4">
                Click the "Load Orders" button above to fetch order data from the API.
              </p>
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
                className="pl-9 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <ShoppingCart className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Order {order.id}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          {order.user && (
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {`${order.user.firstName} ${order.user.lastName}`}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            {order.itemCount} items
                          </div>
                        </div>
                        {order.user && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{order.user.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${order.statusInfo.color} mb-2`}>
                        <StatusIcon className="h-3 w-3" />
                        {order.statusInfo.status}
                      </div>
                      <p className="text-xl font-bold text-green-600">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Products in order */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-3">Items in this order:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.products.slice(0, 3).map((item) => {
                        return (
                          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">Product #{item.id}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                      {order.products.length > 3 && (
                        <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg text-sm text-muted-foreground">
                          +{order.products.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
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
