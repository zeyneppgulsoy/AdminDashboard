import { Button } from '@/components/ui/button'
import { User, Plus, Search, Filter, Mail, MapPin } from 'lucide-react'

export default function UsersPage() {
  // Fake Store API'den gelen users verisi
  const users = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@example.com", 
      phone: "+90 555 123 4567",
      city: "Istanbul",
      totalOrders: 8,
      totalSpent: 2340,
      status: "active"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@example.com", 
      phone: "+90 555 987 6543",
      city: "Ankara",
      totalOrders: 15,
      totalSpent: 5670,
      status: "active"
    },
    { 
      id: 3, 
      name: "Bob Wilson", 
      email: "bob.wilson@example.com", 
      phone: "+90 555 456 7890",
      city: "Izmir",
      totalOrders: 3,
      totalSpent: 890,
      status: "inactive"
    },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">View and manage all customers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New User
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">User List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Contact</th>
                <th className="text-left p-4 font-medium">Location</th>
                <th className="text-left p-4 font-medium">Orders</th>
                <th className="text-left p-4 font-medium">Spent</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="text-sm text-muted-foreground">{user.phone}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {user.city}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{user.totalOrders}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">₺{user.totalSpent.toLocaleString()}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
