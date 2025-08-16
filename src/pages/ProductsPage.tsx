import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Search } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function ProductsPage() {
  const { products, productsLoading, fetchProducts } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Remove auto-fetch to prevent automatic loading

  // Filter products
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (products.length === 0 && !productsLoading) {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products Management</h1>
            <p className="text-muted-foreground">Click "Load Products" to fetch product data</p>
          </div>
          <Button onClick={fetchProducts} className="gap-2">
            <Package className="h-4 w-4" />
            Load Products
          </Button>
        </div>

        {/* Empty state */}
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4">No Products Loaded</h3>
              <Button onClick={fetchProducts} className="gap-2">
                <Package className="h-4 w-4" />
                Load Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products Management</h1>
          <p className="text-muted-foreground">
            {products.length > 0 
              ? `Manage your product inventory (${filteredProducts.length} products)`
              : 'Click "Load Products" to fetch product data'
            }
          </p>
        </div>
        {products.length === 0 && !productsLoading && (
          <Button onClick={fetchProducts} className="gap-2">
            <Package className="h-4 w-4" />
            Load Products
          </Button>
        )}
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {productsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 px-2 sm:px-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden max-w-full">
              <div className="relative w-full">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-32 sm:h-40 md:h-44 lg:h-48 object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full max-w-20 sm:max-w-none truncate">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-2 sm:p-3 md:p-4">
                <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base line-clamp-2">{product.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Stock: {product.stock}
                  </span>
                </div>
                
                <div className="text-center">
                  <Button size="sm" variant="outline" className="w-full text-xs py-1 sm:py-2">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}