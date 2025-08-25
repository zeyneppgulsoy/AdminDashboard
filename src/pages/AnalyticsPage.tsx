import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, BarChart3, Target, Users, ShoppingBag, DollarSign, Calendar } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'
import { api } from '@/services/api'

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalOrders: number
    avgOrderValue: number
    conversionRate: number
    topSellingCategory: string
    growthRate: number
  }
  chartData: {
    revenueAnalytics: Array<{month: string, revenue: number, orders: number, customers: number}>
    categoryPerformance: Array<{name: string, value: number, sales: number, fill: string}>
    customerSegments: Array<{name: string, value: number, fill: string}>
    monthlyComparison: Array<{period: string, thisYear: number, lastYear: number}>
  }
}

export default function AnalyticsPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    overview: {
      totalRevenue: 0,
      totalOrders: 0,
      avgOrderValue: 0,
      conversionRate: 0,
      topSellingCategory: '',
      growthRate: 0
    },
    chartData: {
      revenueAnalytics: [],
      categoryPerformance: [],
      customerSegments: [],
      monthlyComparison: []
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [stats, chartData] = await Promise.all([
          api.getDashboardStats(),
          api.getChartData()
        ])

        // Enhanced analytics calculations
        const avgOrderValue = stats.totalRevenue / stats.totalOrders
        const conversionRate = Math.random() * 5 + 2 // Mock conversion rate
        const growthRate = Math.random() * 30 + 10 // Mock growth rate

        // Revenue analytics (12 months)
        const revenueAnalytics = Array.from({ length: 12 }, (_, i) => {
          const month = new Date()
          month.setMonth(month.getMonth() - 11 + i)
          return {
            month: month.toLocaleDateString('en-US', { month: 'short' }),
            revenue: Math.floor(Math.random() * 50000) + 20000,
            orders: Math.floor(Math.random() * 500) + 200,
            customers: Math.floor(Math.random() * 300) + 150
          }
        })

        // Customer segments
        const customerSegments = [
          { name: 'New Customers', value: 35, fill: '#3b82f6' },
          { name: 'Returning', value: 45, fill: '#10b981' },
          { name: 'VIP', value: 20, fill: '#f59e0b' }
        ]

        // Monthly comparison
        const monthlyComparison = [
          { period: 'Jan', thisYear: 45000, lastYear: 38000 },
          { period: 'Feb', thisYear: 52000, lastYear: 42000 },
          { period: 'Mar', thisYear: 48000, lastYear: 45000 },
          { period: 'Apr', thisYear: 61000, lastYear: 47000 },
          { period: 'May', thisYear: 55000, lastYear: 49000 },
          { period: 'Jun', thisYear: 67000, lastYear: 52000 }
        ]

        setAnalyticsData({
          overview: {
            totalRevenue: stats.totalRevenue,
            totalOrders: stats.totalOrders,
            avgOrderValue,
            conversionRate,
            topSellingCategory: chartData.categoryData[0]?.name || 'Electronics',
            growthRate
          },
          chartData: {
            revenueAnalytics,
            categoryPerformance: chartData.categoryData,
            customerSegments,
            monthlyComparison
          }
        })
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  const { overview, chartData } = analyticsData

  return (
    <div className="min-h-screen w-full p-2 sm:p-3 box-border analytics-scroll flex flex-col">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">Analytics Dashboard</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Comprehensive business insights and performance metrics</p>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Card className="relative overflow-hidden border-l-4 border-l-blue-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-3xl font-bold text-blue-600">{loading ? '...' : `$${overview.avgOrderValue?.toFixed(0)}`}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500 font-medium">+{overview.growthRate?.toFixed(1)}%</span>
                </div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-green-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold text-green-600">{loading ? '...' : `${overview.conversionRate?.toFixed(1)}%`}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500 font-medium">+0.5%</span>
                </div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-purple-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Top Category</p>
                <p className="text-2xl font-bold text-purple-600 truncate">{loading ? '...' : overview.topSellingCategory}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm bg-purple-100 dark:bg-purple-900 text-purple-600 px-2 py-1 rounded-full font-medium">Best Seller</span>
                </div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-l-4 border-l-orange-500">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                <p className="text-3xl font-bold text-orange-600">{loading ? '...' : `+${overview.growthRate?.toFixed(1)}%`}</p>
                <div className="flex items-center mt-2">
                  <Calendar className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-500 font-medium">vs last month</span>
                </div>
              </div>
              <div className="h-16 w-16 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="space-y-4">
        {/* Revenue and Customer Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                           {/* Revenue Analytics */}
            <Card className="flex flex-col h-[320px] sm:h-96">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Revenue Analytics
              </CardTitle>
              <p className="text-xs text-muted-foreground">12-month revenue and order trends</p>
            </CardHeader>
            <CardContent className="p-2 flex-1">
              <div className="h-full min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.revenueAnalytics}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    fontSize={11}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    fontSize={11}
                    tick={{ fill: '#9ca3af' }}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

                                   {/* Customer Segments */}
          <Card className="flex flex-col h-[320px] sm:h-96">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-purple-600" />
                Customer Segments
              </CardTitle>
              <p className="text-xs text-muted-foreground">Customer distribution analysis</p>
            </CardHeader>
            <CardContent className="p-2 flex-1 min-h-0">
              <div className="space-y-2 h-full flex flex-col">
                <div className="h-40 sm:h-56 relative">
                  <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData.customerSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={isMobile ? 20 : 40}
                      outerRadius={isMobile ? 50 : 80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {chartData.customerSegments.map((entry, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-xs sm:text-lg font-bold">
                      {chartData.customerSegments.reduce((sum, segment) => sum + segment.value, 0)}%
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
              
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-1' : 'grid-cols-1 gap-1'} text-xs px-2`}>
                {chartData.customerSegments.map((segment, index: number) => (
                  <div key={index} className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: segment.fill }}></div>
                      <span className="text-xs">{segment.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{segment.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

                                   {/* Monthly Comparison */}
          <Card className="h-[280px] sm:h-72 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-green-600" />
                Year-over-Year Comparison
              </CardTitle>
              <p className="text-xs text-muted-foreground">Monthly revenue comparison with previous year</p>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-40 sm:h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.monthlyComparison} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis 
                      dataKey="period" 
                      fontSize={10}
                      tick={{ fill: '#9ca3af' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      fontSize={10}
                      tick={{ fill: '#9ca3af' }}
                      width={50}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar 
                      dataKey="thisYear" 
                      fill="#3b82f6" 
                      radius={[3, 3, 0, 0]}
                      maxBarSize={18}
                    />
                    <Bar 
                      dataKey="lastYear" 
                      fill="#6b7280" 
                      radius={[3, 3, 0, 0]}
                      maxBarSize={18}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}