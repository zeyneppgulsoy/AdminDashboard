import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Home, Store, Users, Package, ShoppingCart, Menu, X } from 'lucide-react'
import { useTheme } from '@/contexts/theme-provider'
import ScrollToTop from '@/components/ScrollToTop'

// Import pages
import DashboardPage from '@/pages/DashboardPage'
import StoresPage from '@/pages/StoresPage'
import UsersPage from '@/pages/UsersPage'
import ProductsPage from '@/pages/ProductsPage'
import OrdersPage from '@/pages/OrdersPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Stores', href: '/stores', icon: Store },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900/95 transition-colors duration-200">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:bg-white lg:dark:bg-slate-800/60 lg:backdrop-blur-sm lg:border-r lg:border-gray-200 lg:dark:border-slate-600/40">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-4">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin
              </span>
              </div>
            </div>
            
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200 ${
                            isActive 
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                              : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <Icon className={`h-6 w-6 shrink-0 transition-colors ${
                            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`} />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
            </div>
            
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white dark:bg-slate-800 shadow-xl">
            <div className="flex h-16 shrink-0 items-center justify-between px-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
              </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin
                </span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col px-6 py-4">
              <ul role="list" className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
                    <li key={item.name}>
              <Link
                to={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200 ${
                  isActive
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                        <Icon className={`h-6 w-6 shrink-0 transition-colors ${
                          isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`} />
                {item.name}
              </Link>
                    </li>
            )
          })}
              </ul>
        </nav>
      </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-slate-600/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-4 shadow-sm lg:gap-x-6 lg:px-6">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
            <Menu className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Page title */}
            <div className="flex flex-1 items-center">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {location.pathname === '/' && 'E-Commerce Dashboard'}
              {location.pathname === '/stores' && 'Store Management'}
              {location.pathname === '/users' && 'User Management'}
            </h1>
          </div>
          
            {/* Theme toggle */}
            <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="h-9 w-9 p-0"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="px-4 pt-4 pb-4">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App