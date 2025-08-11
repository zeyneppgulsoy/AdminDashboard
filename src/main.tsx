import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/theme-provider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="admin-dashboard-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  ,
)
