import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, Users, ShoppingCart, DollarSign, TrendingUp, PieChart as PieChartIcon } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { api, type Cart } from '@/services/api'

export default function DashboardPage() {
  // State for API data
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentCarts: [] as Cart[]
  })
  const [chartData, setChartData] = useState<{
    salesData: Array<{name: string, totalRevenue: number, totalSales: number}>
    categoryData: Array<{name: string, value: number, sales: number, fill: string}>
  }>({
    salesData: [],
    categoryData: []
  })
  const [loading, setLoading] = useState(true)

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [stats, charts] = await Promise.all([
          api.getDashboardStats(),
          api.getChartData()
        ])
        setDashboardStats(stats)
        setChartData(charts)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])









  return (
    <div className="min-h-screen w-full p-1 sm:p-2 pb-8 sm:pb-4 box-border flex flex-col dashboard-mobile">
      {/* Simple Test Cards */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        <Card>
          <CardContent className="p-3 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{loading ? '...' : dashboardStats.totalProducts}</p>
                <p className="text-sm text-green-600">↗ +12%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{loading ? '...' : dashboardStats.totalUsers}</p>
                <p className="text-sm text-green-600">↗ +5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{loading ? '...' : dashboardStats.totalOrders}</p>
                <p className="text-sm text-green-600">↗ +8%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{loading ? '...' : `$${dashboardStats.totalRevenue.toLocaleString()}`}</p>
                <p className="text-sm text-green-600">↗ +15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-[350px] sm:h-[420px] mb-8 sm:mb-0 pb-8 sm:pb-0">
        {/* Monthly Performance */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Total Revenue
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Sales</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 flex-1">
            <div className="h-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                  <CartesianGrid strokeDasharray="1 1" stroke="#e2e8f0" className="dark:stroke-slate-700" vertical={false} />
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
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-2 text-base">
              <PieChartIcon className="h-4 w-4 text-purple-600" />
              Sales by Category
            </CardTitle>
            <p className="text-xs text-muted-foreground">Product distribution</p>
          </CardHeader>
          <CardContent className="p-2 pb-4 flex-1 min-h-0">
            <div className="space-y-3 h-full flex flex-col">
              {/* Chart Container */}
              <div className="h-40 sm:h-56 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={window.innerWidth < 640 ? 25 : 40}
                      outerRadius={window.innerWidth < 640 ? 55 : 80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {chartData.categoryData.map((entry, index) => (
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
                    <div className="text-sm sm:text-lg font-bold">$86.8k</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-1 text-xs px-2 pb-2">
                {chartData.categoryData.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: category.fill }}></div>
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