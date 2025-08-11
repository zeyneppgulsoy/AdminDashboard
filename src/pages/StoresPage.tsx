import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Store, Plus, Search, Filter, MapPin, Trash2, Edit, Eye, Building2 } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function StoresPage() {
  const { users, usersLoading, fetchUsers, deleteUser } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Filter users that have companies (treating them as store owners)
  const stores = users.filter(user => user.company?.name).map(user => ({
    id: user.id,
    name: user.company.name,
    owner: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    address: `${user.address.address}, ${user.address.city}, ${user.address.state}`,
    department: user.company.department,
    title: user.company.title,
    status: user.role === 'admin' ? 'premium' : 'active',
    image: user.image,
    companyAddress: `${user.company.address.address}, ${user.company.address.city}`
  }))

  // Filter stores based on search query
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteStore = async (id: number) => {
    if (confirm('Are you sure you want to delete this store?')) {
      await deleteUser(id)
    }
  }

  if (usersLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading stores...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Store Management</h1>
          <p className="text-muted-foreground">
            View and manage all stores • {filteredStores.length} stores found
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Store
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Stores</p>
                <p className="text-2xl font-bold">{stores.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Stores</p>
                <p className="text-2xl font-bold">{stores.filter(s => s.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-bold">★</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Premium Stores</p>
                <p className="text-2xl font-bold">{stores.filter(s => s.status === 'premium').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Unique Cities</p>
                <p className="text-2xl font-bold">{new Set(stores.map(s => s.address.split(',')[1]?.trim())).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stores, owners, or emails..."
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

      {/* Stores Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Store List ({filteredStores.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredStores.length === 0 ? (
            <div className="text-center py-8">
              <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No stores found matching your search.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">Store</th>
                    <th className="text-left p-4 font-medium">Owner</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Business Info</th>
                    <th className="text-left p-4 font-medium">Location</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.map((store) => (
                    <tr key={store.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img 
                              src={store.image} 
                              alt={store.owner}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center">
                              <Store className="h-2 w-2 text-white" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{store.name}</p>
                            <p className="text-sm text-muted-foreground">ID: #{store.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{store.owner}</p>
                          <p className="text-sm text-muted-foreground">{store.title}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm">{store.email}</p>
                          <p className="text-sm text-muted-foreground">{store.phone}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{store.department}</p>
                          <p className="text-sm text-muted-foreground">{store.companyAddress}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{store.address}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          store.status === 'premium' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : store.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {store.status === 'premium' ? '★ Premium' : store.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteStore(store.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
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
