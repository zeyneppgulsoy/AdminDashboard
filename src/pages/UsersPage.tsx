import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Plus, Search, Filter, Mail, MapPin } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function UsersPage() {
  const { users, usersLoading, fetchUsers, deleteUser, clearUsers, clearAllData } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Remove auto-fetch to prevent automatic loading
  // useEffect(() => {
  //   fetchUsers()
  // }, [fetchUsers])

  // Debug logging
  console.log('🔵 UsersPage render - users length:', users.length)
  console.log('🔵 UsersPage render - usersLoading:', usersLoading)

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Show load button if no users data
  if (users.length === 0 && !usersLoading) {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Click "Load Users" to fetch user data</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchUsers} variant="default">
              Load Users
            </Button>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              New User
            </Button>
          </div>
        </div>

        {/* Empty state */}
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Users Loaded</h3>
              <p className="text-muted-foreground mb-4">
                Click the "Load Users" button above to fetch user data from the API.
              </p>
              <Button onClick={fetchUsers}>
                Load Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (usersLoading) {
    return (
      <div className="p-6">
        {/* Header - same as normal page to prevent layout shift */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Loading users...</p>
          </div>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            New User
          </Button>
        </div>

        {/* Search bar skeleton */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 h-10 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-10 w-20 bg-muted rounded-lg animate-pulse"></div>
        </div>

        {/* Table skeleton */}
        <Card>
          <CardHeader>
            <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border-b">
                  <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
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
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            View and manage all customers • {filteredUsers.length} users found
          </p>
        </div>
                  <div className="flex gap-2">
            <Button onClick={fetchUsers} variant="outline" disabled={usersLoading}>
              {usersLoading ? 'Loading...' : 'Reload Users'}
            </Button>
            <Button onClick={clearUsers} variant="outline" size="sm">
              Clear Users
            </Button>
            <Button onClick={clearAllData} variant="destructive" size="sm">
              Clear All
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New User
            </Button>
          </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
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
          <CardTitle>User List ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No users found matching your search.' : 'No users loaded yet.'}
              </p>
            </div>
          ) : (
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
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
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
