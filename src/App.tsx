/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Home, Store, Users, Menu, X } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import ScrollToTop from '@/components/ScrollToTop'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Type definitions
interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  role?: string;
  image: string;
  company?: {
    name: string;
    title: string;
    department: string;
  };
  address: {
    city: string;
    state: string;
    address: string;
  };
  birthDate?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
}

interface DummyStore {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: {
    name: string;
    title: string;
    department: string;
  };
  address: {
    city: string;
    state: string;
    address: string;
  };
}

// Sadece basit sayfalar import edelim - sorunlu olanları değil
// import DashboardPage from '@/pages/DashboardPage'
// import StoresPage from '@/pages/StoresPage'
// import UsersPage from '@/pages/UsersPage'
// import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { theme, setTheme } = useTheme()





  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Stores', href: '/stores', icon: Store },
    { name: 'Users', href: '/users', icon: Users },
  ]

  // Global functions for users
  React.useEffect(() => {
    // Reset scroll position on page load/refresh
    window.scrollTo(0, 0);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // Display users in card format
    (window as any).displayUsers = (users: DummyUser[]) => {
      const grid = document.getElementById('usersGrid');
      if (!grid || !users) return;
      
      grid.innerHTML = users.map(user => `
        <div class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-4">
              <img 
                src="${user.image}" 
                alt="${user.firstName}"
                class="w-12 h-12 rounded-full object-cover"
                onerror="this.src='https://via.placeholder.com/48/f3f4f6/9ca3af?text=${user.firstName[0]}'"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  ${user.firstName} ${user.lastName}
                </p>
                <p class="text-sm text-gray-500 truncate">${user.email}</p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }">
                ${user.role || 'user'}
              </span>
            </div>
            
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex justify-between">
                <span>Age:</span>
                <span class="font-medium">${user.age}</span>
              </div>
              <div class="flex justify-between">
                <span>Phone:</span>
                <span class="font-medium">${user.phone}</span>
              </div>
              <div class="flex justify-between">
                <span>Company:</span>
                <span class="font-medium truncate ml-2">${user.company?.name || 'N/A'}</span>
              </div>
              <div class="flex justify-between">
                <span>Location:</span>
                <span class="font-medium">${user.address?.city}, ${user.address?.state}</span>
              </div>
            </div>
            
            <div class="mt-6 flex space-x-3">
              <button 
                onclick="window.viewUser(${user.id})"
                class="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                View Details
              </button>
              <button 
                                                  onclick="window.deleteUserLive(${user.id}, '${user.firstName} ${user.lastName}')"
                class="bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      `).join('');
    };

    // Filter users function
    (window as any).filterUsers = (searchTerm: string) => {
      const roleFilter = (document.getElementById('roleFilter') as HTMLSelectElement)?.value;
      const allUsers = (window as any).allUsers as DummyUser[];
      
      console.log('Filter called:', { searchTerm, roleFilter, allUsersCount: allUsers?.length });
      
      if (!allUsers) {
        console.log('No users loaded yet');
        return;
      }
      
      const filtered = allUsers.filter((user: DummyUser) => {
        // If search term is empty, show all users (based on role filter)
        if (!searchTerm.trim()) {
          const roleMatch = !roleFilter || (user.role || 'user').toLowerCase() === roleFilter.toLowerCase();
          return roleMatch;
        }
        
        // If search term exists, filter by name/email AND role
        const nameMatch = 
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase().trim());
        
        const roleMatch = !roleFilter || (user.role || 'user').toLowerCase() === roleFilter.toLowerCase();
        
        console.log('User check:', user.firstName, { nameMatch, roleMatch, searchTerm: searchTerm.trim() });
        
        return nameMatch && roleMatch;
      });
      
      console.log('Filtered results:', filtered.length, 'out of', allUsers.length);
      (window as any).displayUsers(filtered);
    };

    // View user details
    (window as any).viewUser = (userId: number) => {
      const allUsers = (window as any).allUsers as DummyUser[];
      const user = allUsers?.find((u: DummyUser) => u.id === userId);
      if (user) {
        alert(`User Details:
        
Name: ${user.firstName} ${user.lastName}
Email: ${user.email}
Phone: ${user.phone}
Age: ${user.age}
Role: ${user.role || 'user'}
Company: ${user.company?.name || 'N/A'}
Department: ${user.company?.department || 'N/A'}
Title: ${user.company?.title || 'N/A'}
Address: ${user.address?.address}, ${user.address?.city}, ${user.address?.state}
Birth Date: ${user.birthDate}
Blood Group: ${user.bloodGroup}
Height: ${user.height}cm
Weight: ${user.weight}kg`);
      }
    };

    // User delete function
    (window as any).deleteUserLive = async (userId: number, userName: string) => {
      if (confirm(`Delete ${userName}? (Real API call)`)) {
        try {
          const response = await fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          console.log('Delete result:', result);
          alert(`${userName} deleted successfully! (Check console)`);
          
          // Remove from allUsers array
          const allUsers = (window as any).allUsers as DummyUser[];
          if (allUsers) {
            (window as any).allUsers = allUsers.filter((u: DummyUser) => u.id !== userId);
            const searchTerm = (document.getElementById('userSearch') as HTMLInputElement)?.value || '';
            (window as any).filterUsers(searchTerm);
          }
        } catch (error) {
          console.error('Delete error:', error);
          alert('Delete failed!');
        }
      }
    };

    // Store functions - Card format
    (window as any).displayStores = (stores: DummyStore[]) => {
      const grid = document.getElementById('storesGrid');
      if (!grid || !stores) return;
      
      grid.innerHTML = stores.map(user => `
        <div class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-4">
              <img 
                src="${user.image}" 
                alt="${user.firstName}"
                class="w-12 h-12 rounded-full object-cover"
                onerror="this.src='https://via.placeholder.com/48/f3f4f6/9ca3af?text=${user.company.name[0]}'"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  ${user.company.name}
                </p>
                <p class="text-sm text-gray-500 truncate">${user.company.department}</p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex justify-between">
                <span>Owner:</span>
                <span class="font-medium">${user.firstName} ${user.lastName}</span>
              </div>
              <div class="flex justify-between">
                <span>Title:</span>
                <span class="font-medium">${user.company.title}</span>
              </div>
              <div class="flex justify-between">
                <span>Email:</span>
                <span class="font-medium truncate ml-2">${user.email}</span>
              </div>
              <div class="flex justify-between">
                <span>Phone:</span>
                <span class="font-medium">${user.phone}</span>
              </div>
              <div class="flex justify-between">
                <span>Location:</span>
                <span class="font-medium">${user.address.city}, ${user.address.state}</span>
              </div>
            </div>
            
            <div class="mt-6 flex space-x-3">
              <button 
                onclick="alert('Store Details:\\n\\nName: ${user.company.name}\\nOwner: ${user.firstName} ${user.lastName}\\nDepartment: ${user.company.department}\\nTitle: ${user.company.title}\\nEmail: ${user.email}\\nPhone: ${user.phone}\\nAddress: ${user.address.address}, ${user.address.city}, ${user.address.state}')"
                class="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                View Details
              </button>
              <button 
                onclick="window.deleteStoreLive('${user.company.name}')"
                class="bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      `).join('');
      
      if (stores.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500"><p class="text-lg font-medium">No stores found</p><p class="text-sm">Try a different search term</p></div>';
      }
    };

    (window as any).filterStores = (searchTerm: string) => {
      const allStores = (window as any).allStores as DummyStore[];
      
      console.log('Filter stores called:', { searchTerm, allStoresCount: allStores?.length });
      
      if (!allStores) {
        console.log('No stores loaded yet');
        return;
      }
      
      const filtered = allStores.filter((store: DummyStore) => {
        // If search term is empty, show all stores
        if (!searchTerm.trim()) {
          return true;
        }
        
        // If search term exists, filter by company name, owner name, or department
        const nameMatch = 
          store.company.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          store.firstName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          store.lastName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          store.company.department.toLowerCase().includes(searchTerm.toLowerCase().trim());
        
        return nameMatch;
      });
      
      console.log('Filtered stores:', filtered.length, 'out of', allStores.length);
      (window as any).displayStores(filtered);
    };

    // Store delete function
    (window as any).deleteStoreLive = async (storeName: string) => {
      if (confirm(`Delete store "${storeName}"? (Demo action)`)) {
        try {
          console.log(`Deleting store: ${storeName}`);
          alert(`Store "${storeName}" deleted successfully! (Demo)`);
          
          // Remove from allStores array
          const allStores = (window as any).allStores as DummyStore[];
          if (allStores) {
            (window as any).allStores = allStores.filter((s: DummyStore) => s.company.name !== storeName);
            const searchTerm = (document.getElementById('storeSearch') as HTMLInputElement)?.value || '';
            (window as any).filterStores(searchTerm);
          }
        } catch (error) {
          console.error('Delete error:', error);
          alert('Delete failed!');
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background m-0 p-0 overflow-hidden">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 top-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-12 px-6 border-b">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-4 px-4">
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
      <div className="lg:ml-64 m-0 p-0 min-h-screen relative">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between h-12 px-6 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-4"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold text-gray-800">
              {location.pathname === '/' && 'E-Commerce Dashboard'}
              {location.pathname === '/stores' && 'Store Management'}
              {location.pathname === '/users' && 'User Management'}
            </h1>
          </div>
          
          <div className="flex items-center justify-end flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-auto"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Page content - No top padding */}
        <main className="px-6 pt-16 pb-6">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={
              <div>
                {/* TailAdmin Style Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Sales</p>
                        <p className="text-2xl font-bold text-gray-900">$3.456K</p>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          ↗ 0.43% 
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Profit</p>
                        <p className="text-2xl font-bold text-gray-900">$45.2K</p>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          ↗ 4.35%
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Product</p>
                        <p className="text-2xl font-bold text-gray-900">2.450</p>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          ↗ 2.59%
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">3.456</p>
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          ↘ 0.95%
                        </p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-full">
                        <Users className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Section - TailAdmin Style */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Chart */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
                      <div className="flex space-x-2">
                        <button className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">Day</button>
                        <button className="text-xs px-2 py-1 text-gray-500 rounded">Week</button>
                        <button className="text-xs px-2 py-1 text-gray-500 rounded">Month</button>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { name: 'Jan', revenue: 65, sales: 28 },
                          { name: 'Feb', revenue: 59, sales: 48 },
                          { name: 'Mar', revenue: 80, sales: 40 },
                          { name: 'Apr', revenue: 81, sales: 19 },
                          { name: 'May', revenue: 56, sales: 86 },
                          { name: 'Jun', revenue: 55, sales: 27 },
                          { name: 'Jul', revenue: 40, sales: 90 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#3b82f6' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="sales" 
                            stroke="#06b6d4" 
                            strokeWidth={3}
                            dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#06b6d4' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Profit Chart */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Profit this week</h3>
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-xs text-gray-500">Revenue</span>
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { day: 'M', value: 45 },
                          { day: 'T', value: 52 },
                          { day: 'W', value: 38 },
                          { day: 'T', value: 61 },
                          { day: 'F', value: 42 },
                          { day: 'S', value: 58 },
                          { day: 'S', value: 65 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }} 
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/stores" element={
              <div>
                <div className="flex justify-between items-center mb-6 mt-6">
                  <div></div>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm">
                    + Add New Store
                  </button>
                </div>
                

                
                {/* Store Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏪</span>
                      <div>
                        <p className="text-sm text-gray-600">Total Stores</p>
                        <p className="text-xl font-bold">28</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="text-sm text-gray-600">Active Stores</p>
                        <p className="text-xl font-bold">24</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <p className="text-sm text-gray-600">Premium Stores</p>
                        <p className="text-xl font-bold">8</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-lg shadow-sm border mb-8">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input 
                          id="storeSearch"
                          type="text" 
                          placeholder="Search stores..." 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          onKeyUp={(e) => {
                            const searchTerm = (e.target as HTMLInputElement).value;
                            (window as any).filterStores(searchTerm);
                          }}
                        />
                      </div>
                      <button 
                        id="loadStores"
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                        onClick={async () => {
                          try {
                            const response = await fetch('https://dummyjson.com/users?limit=30&select=firstName,lastName,email,phone,company,address,image');
                            const data = await response.json();
                            console.log('All Users for Stores:', data);
                            
                            // Filter users who have companies
                            const storeOwners = data.users.filter((user: any) => user.company && user.company.name) as DummyStore[];
                            (window as any).allStores = storeOwners;
                            (window as any).displayStores(storeOwners);
                            
                            // Clear search when loading fresh data
                            const searchInput = document.getElementById('storeSearch') as HTMLInputElement;
                            if (searchInput) searchInput.value = '';
                          } catch (error) {
                            console.error('Load error:', error);
                            alert('Failed to load stores!');
                          }
                        }}
                      >
                        🏪 Load All Stores
                      </button>
                    </div>
                  </div>
                </div>



                {/* Store List - DummyJSON Data Simulation */}
                {/* Stores Grid */}
                <div id="storesGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <div className="mb-4">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">No stores loaded</p>
                    <p className="text-sm">Click "Load All Stores" to fetch real data from DummyJSON</p>
                  </div>
                </div>

                {/* Hidden table for compatibility */}
                <div style={{display: 'none'}}>
                  <table id="storesTable">
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            } />
            <Route path="/users" element={
              <div>
                <div className="flex justify-between items-center mb-6 mt-6">
                  <div></div>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm">
                    + Add New User
                  </button>
                </div>
                

                
                {/* Search and Filter Bar */}
                <div className="bg-white rounded-lg shadow-sm border mb-8">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input 
                          id="userSearch"
                          type="text" 
                          placeholder="Search users..." 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          onKeyUp={(e) => {
                            const searchTerm = (e.target as HTMLInputElement).value;
                            (window as any).filterUsers(searchTerm);
                          }}
                        />
                      </div>
                      <select 
                        id="roleFilter"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500"
                        onChange={() => {
                          const searchTerm = (document.getElementById('userSearch') as HTMLInputElement)?.value || '';
                          (window as any).filterUsers(searchTerm);
                        }}
                      >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="user">User</option>
                      </select>
                      <button 
                        id="loadUsers"
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                        onClick={async () => {
                          try {
                            const response = await fetch('https://dummyjson.com/users?limit=30');
                            const data = await response.json();
                            console.log('All Users:', data);
                            
                            (window as any).allUsers = data.users || [] as DummyUser[];
                            (window as any).displayUsers((window as any).allUsers as DummyUser[]);
                            
                            // Clear search when loading fresh data
                            const searchInput = document.getElementById('userSearch') as HTMLInputElement;
                            const roleSelect = document.getElementById('roleFilter') as HTMLSelectElement;
                            if (searchInput) searchInput.value = '';
                            if (roleSelect) roleSelect.value = '';
                          } catch (error) {
                            console.error('Load error:', error);
                            alert('Failed to load users!');
                          }
                        }}
                      >
                        📋 Load All Users
        </button>
                    </div>
                  </div>
                </div>

                {/* Users Grid */}
                <div id="usersGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <div className="mb-4">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">No users loaded</p>
                    <p className="text-sm">Click "Load All Users" to fetch real data from DummyJSON</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="*" element={
              <div>
                <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
