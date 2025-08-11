import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Store, Plus, Search, Filter, MapPin, Trash2, Eye, Building2 } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function StoresPage() {
  const { stores: storeUsers, storesLoading, fetchStores, deleteStore } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Remove auto-fetch to prevent automatic loading
  // useEffect(() => {
  //   fetchStores()
  // }, [fetchStores])



  // Handle delete store
  const handleDeleteStore = async (id: number) => {
    await deleteStore(id)
  }

  // Filter users that have companies (treating them as store owners)
  const stores = storeUsers.filter(user => user.company?.name).map(user => ({
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

  if (storesLoading) {
    return (
      <div className="p-6">
        {/* Header - same as normal page to prevent layout shift */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Store Management</h1>
            <p className="text-muted-foreground">Loading stores...</p>
          </div>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            New Store
          </Button>
        </div>

        {/* Loading skeleton that maintains grid structure */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    <div className="h-6 w-12 bg-muted rounded animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search bar skeleton */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 h-10 bg-muted rounded-lg animate-pulse"></div>
          <div className="h-10 w-20 bg-muted rounded-lg animate-pulse"></div>
        </div>

        {/* Table skeleton */}
        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted rounded animate-pulse"></div>
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

  // Show load button if no stores data
  if (storeUsers.length === 0 && !storesLoading) {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Store Management</h1>
            <p className="text-muted-foreground">Click "Load Stores" to fetch store data</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchStores} variant="default">
              Load Stores
            </Button>
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              New Store
            </Button>
          </div>
        </div>

        {/* Empty state */}
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Stores Loaded</h3>
              <p className="text-muted-foreground mb-4">
                Click the "Load Stores" button above to fetch store data from the API.
              </p>
              <Button onClick={fetchStores}>
                Load Stores
              </Button>
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
          <h1 className="text-3xl font-bold mb-2">Store Management</h1>
          <p className="text-muted-foreground">
            View and manage all stores • {filteredStores.length} stores found
          </p>
        </div>
                  <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Store
            </Button>
          </div>
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

      {/* Stores Cards */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Store List ({filteredStores.length})
        </h2>
        {filteredStores.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No stores found matching your search.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow cursor-pointer relative">
                <CardContent className="p-6">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      store.status === 'premium' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : store.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {store.status === 'premium' ? '★ Premium' : store.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Store Header */}
                  <div className="flex items-center gap-3 mb-4 pr-20">
                    <div className="relative">
                      <img 
                        src={store.image} 
                        alt={store.owner}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <Store className="h-2 w-2 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{store.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: #{store.id}</p>
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Owner</p>
                      <p className="font-medium">{store.owner}</p>
                      <p className="text-sm text-muted-foreground">{store.title}</p>
                    </div>

                    {/* Contact */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Contact</p>
                      <div className="space-y-1">
                        <p className="text-sm">{store.email}</p>
                        <p className="text-sm text-muted-foreground">📞 {store.phone}</p>
                      </div>
                    </div>

                    {/* Business Info */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Department</p>
                      <p className="text-sm font-medium">{store.department}</p>
                    </div>

                    {/* Location */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{store.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteStore(store.id)}
                      className="flex-1"
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
