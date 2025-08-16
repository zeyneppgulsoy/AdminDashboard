import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, Users, ShoppingCart, DollarSign, TrendingUp, PieChart as PieChartIcon } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function DashboardPage() {
  // E-commerce specific data - Revenue & Sales tracking
  const salesData = [
    { name: 'Sep', totalRevenue: 25400, totalSales: 18200 },
    { name: 'Oct', totalRevenue: 22800, totalSales: 16500 },
    { name: 'Nov', totalRevenue: 28600, totalSales: 20800 },
    { name: 'Dec', totalRevenue: 31200, totalSales: 23500 },
    { name: 'Jan', totalRevenue: 29800, totalSales: 21200 },
    { name: 'Feb', totalRevenue: 33500, totalSales: 24800 },
    { name: 'Mar', totalRevenue: 38200, totalSales: 28100 },
    { name: 'Apr', totalRevenue: 35600, totalSales: 26300 },
    { name: 'May', totalRevenue: 41800, totalSales: 31500 },
    { name: 'Jun', totalRevenue: 39200, totalSales: 29800 },
    { name: 'Jul', totalRevenue: 45200, totalSales: 34200 },
    { name: 'Aug', totalRevenue: 47800, totalSales: 36500 },
  ]



  // Sales by category data for doughnut chart (API-inspired categories)
  const categoryData = [
    { name: 'Beauty', value: 25, sales: 35800, fill: '#3b82f6' },
    { name: 'Fragrances', value: 22, sales: 28500, fill: '#f97316' },
    { name: 'Smartphones', value: 20, sales: 22200, fill: '#eab308' },
    { name: 'Furniture', value: 18, sales: 18800, fill: '#ec4899' },
    { name: 'Groceries', value: 15, sales: 15200, fill: '#10b981' },
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Total Revenue
            </CardTitle>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Total Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Total Sales</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="totalRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="1 1" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={(value) => `${value/1000}k`}
                    domain={['dataMin - 2000', 'dataMax + 2000']}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      `$${value.toLocaleString()}`,
                      name === 'totalRevenue' ? 'Total Revenue' : 'Total Sales'
                    ]}
                    labelStyle={{ color: '#64748b', fontSize: '12px' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalRevenue" 
                    stroke="#7dd3fc" 
                    strokeWidth={3}
                    fill="url(#totalRevenue)"
                    dot={{ fill: '#7dd3fc', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#7dd3fc' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalSales" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fill="url(#totalSales)"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#3b82f6' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>



        {/* Sales by Category - Doughnut Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-purple-600" />
              Sales by Category
            </CardTitle>
            <p className="text-sm text-muted-foreground">Product distribution</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chart Container */}
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={85}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
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
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-xl font-bold">$86.8k</div>
                    <div className="text-xs text-muted-foreground">Total Sales</div>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: category.fill }}></div>
                    <span className="truncate">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}