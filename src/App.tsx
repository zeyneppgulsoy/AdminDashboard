import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Home, Store, Users, Menu, X } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import DashboardPage from '@/pages/DashboardPage'
import StoresPage from '@/pages/StoresPage'
import UsersPage from '@/pages/UsersPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Stores', href: '/stores', icon: Store },
    { name: 'Users', href: '/users', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 px-6 border-b bg-card">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Admin Dashboard
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
