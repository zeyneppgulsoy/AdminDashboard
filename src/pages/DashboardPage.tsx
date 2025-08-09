import { Button } from '@/components/ui/button'
import { Store, Users, ShoppingCart, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">E-commerce admin panel overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 border rounded-lg bg-card">
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Stores</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">8,567</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">₺125,480</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Add New Store</Button>
          <Button variant="outline">View Users</Button>
          <Button variant="secondary">Download Reports</Button>
        </div>
      </div>
    </div>
  )
}
