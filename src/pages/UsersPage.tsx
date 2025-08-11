import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Plus, Search, Filter, Mail, MapPin } from 'lucide-react'

export default function UsersPage() {
  // Simple test data
  const users = [
    {
      id: 1,
      name: { firstname: "John", lastname: "Doe" },
      email: "john@example.com",
      username: "johnd",
      phone: "1-570-236-7033",
      address: { city: "New York" }
    },
    {
      id: 2,
      name: { firstname: "Jane", lastname: "Smith" },
      email: "jane@example.com", 
      username: "janes",
      phone: "1-570-236-7034",
      address: { city: "Los Angeles" }
    }
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
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Location</th>
                  <th className="text-left p-4 font-medium">Username</th>
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
                          <p className="font-medium">{user.name.firstname} {user.name.lastname}</p>
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
                        {user.address.city}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">@{user.username}</span>
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
        </CardContent>
      </Card>
    </div>
  )
}
