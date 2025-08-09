import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">E-Ticaret Admin Dashboard</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Test Area */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4">shadcn/ui Test</h2>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => setCount(count + 1)}>
                Count: {count}
              </Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4">📊 Dashboard Preview</h2>
            <p className="text-muted-foreground">
              ✅ shadcn/ui kuruldu<br/>
              ✅ Dark/Light mode aktif<br/>
              ✅ Tailwind CSS çalışıyor<br/>
              🚀 Sonraki: React Router & API entegrasyonu
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
