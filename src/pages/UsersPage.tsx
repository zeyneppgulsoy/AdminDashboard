import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User, Plus, Search, Filter, Mail, MapPin, Trash2 } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function UsersPage() {
  const { users, usersLoading, fetchUsers, deleteUser } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Remove auto-fetch to prevent automatic loading
  // useEffect(() => {
  //   fetchUsers()
  // }, [fetchUsers])



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
              <h3 className="text-lg font-semibold mb-4">No Users Loaded</h3>
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
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Users Cards */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">User List ({filteredUsers.length})</h2>
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? 'No users found matching your search.' : 'No users loaded yet.'}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  {/* User Avatar & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-lg truncate">{user.firstName} {user.lastName}</h3>
                      <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{user.address.city}</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="text-sm text-muted-foreground mb-4">
                    📞 {user.phone}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
