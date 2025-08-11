import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, Users, ShoppingCart, DollarSign, TrendingUp, BarChart3 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export default function DashboardPage() {
  // E-commerce specific data
  const salesData = [
    { name: 'Jan', orders: 450, revenue: 32400, customers: 280 },
    { name: 'Feb', orders: 380, revenue: 28900, customers: 245 },
    { name: 'Mar', orders: 620, revenue: 45800, customers: 420 },
    { name: 'Apr', orders: 580, revenue: 41200, customers: 385 },
    { name: 'May', orders: 720, revenue: 52800, customers: 490 },
    { name: 'Jun', orders: 690, revenue: 48900, customers: 465 },
    { name: 'Jul', orders: 820, revenue: 61500, customers: 580 },
  ]

  const topProductsData = [
    { name: 'iPhone 15 Pro', sales: 2450, revenue: 2940000, category: 'Electronics' },
    { name: 'Nike Air Max', sales: 1890, revenue: 340200, category: 'Fashion' },
    { name: 'MacBook Pro M3', sales: 980, revenue: 2450000, category: 'Electronics' },
    { name: 'Samsung Galaxy S24', sales: 1650, revenue: 1485000, category: 'Electronics' },
    { name: 'Adidas Ultraboost', sales: 1420, revenue: 284000, category: 'Fashion' },
  ]

  const categoryData = [
    { name: 'Electronics', value: 42, fill: '#3b82f6', sales: 125000 },
    { name: 'Fashion & Clothing', value: 28, fill: '#10b981', sales: 85000 },
    { name: 'Home & Garden', value: 15, fill: '#f59e0b', sales: 45000 },
    { name: 'Sports & Outdoor', value: 10, fill: '#ef4444', sales: 32000 },
    { name: 'Books & Media', value: 5, fill: '#8b5cf6', sales: 18000 },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">E-commerce admin panel overview</p>
      </div>

      {/* Simple Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stores</p>
                <p className="text-2xl font-bold">15</p>
                <p className="text-xs text-green-600">↗ +12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-green-600">↗ +5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">8,567</p>
                <p className="text-xs text-green-600">↗ +8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$125,480</p>
                <p className="text-xs text-green-600">↗ +15% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Monthly Performance */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Monthly Performance (2024)
            </CardTitle>
            <p className="text-sm text-muted-foreground">Orders, Revenue ($) and New Customers</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${value.toLocaleString()}` : value,
                      name === 'orders' ? 'Orders' : name === 'revenue' ? 'Revenue' : 'New Customers'
                    ]}
                  />
                  <Area type="monotone" dataKey="orders" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.7} />
                  <Area type="monotone" dataKey="customers" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.7} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Sales by Category
            </CardTitle>
            <p className="text-sm text-muted-foreground">Product category breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ value }) => `${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, _, props) => [
                      `${value}% ($${props.payload.sales.toLocaleString()})`,
                      'Market Share'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.fill }}></div>
                      <span>{category.name}</span>
                    </div>
                    <span className="font-medium">${category.sales.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>🔥 Best Selling Products</CardTitle>
          <p className="text-sm text-muted-foreground">Top performing products this month</p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : `${value} units`,
                    name === 'sales' ? 'Units Sold' : 'Revenue'
                  ]}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Button>Add New Store</Button>
            <Button variant="outline">View Users</Button>
            <Button variant="secondary">Download Reports</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
