import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, Users, ShoppingCart, DollarSign } from 'lucide-react'

export default function DashboardPage() {

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

      {/* Quick Actions Test */}
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
