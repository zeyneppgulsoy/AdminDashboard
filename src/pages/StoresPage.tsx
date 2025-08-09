import { Button } from '@/components/ui/button'
import { Store, Plus, Search, Filter } from 'lucide-react'

export default function StoresPage() {
  // Fake Store API'den gelen users'ları mağaza olarak kullanacağız
  const stores = [
    { id: 1, name: "Tech Store", owner: "John Doe", email: "john@techstore.com", status: "active" },
    { id: 2, name: "Fashion Hub", owner: "Jane Smith", email: "jane@fashionhub.com", status: "active" },
    { id: 3, name: "Home & Garden", owner: "Bob Wilson", email: "bob@homemarket.com", status: "inactive" },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Store Management</h1>
          <p className="text-muted-foreground">View and manage all stores</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Store
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stores..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stores Table */}
      <div className="border rounded-lg bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Store List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4 font-medium">Store</th>
                <th className="text-left p-4 font-medium">Owner</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{store.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{store.owner}</td>
                  <td className="p-4">{store.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      store.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {store.status === 'active' ? 'Active' : 'Inactive'}
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
