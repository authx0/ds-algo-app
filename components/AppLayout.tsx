'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Home, BarChart3, Settings, PlayCircle, User, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

interface AppLayoutProps {
  children: ReactNode
  activePage?: string
  userStats?: {
    level: number
    experience: number
    streak: number
    totalPoints: number
  }
}

export function AppLayout({ children, activePage, userStats }: AppLayoutProps) {
  const stats = userStats || { level: 1, experience: 0, streak: 0, totalPoints: 0 }
  
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Frosted background */}
      <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-3xl" />
      </div>
      
      {/* Subtle animated orbs for depth */}
      <div className="fixed inset-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-300 dark:bg-pink-700 rounded-full filter blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass m-4 rounded-2xl relative z-10">
        <div className="p-6 min-h-[88px] flex items-center">
          <span className="font-bold text-2xl text-gray-900 dark:text-white">DS&A Master</span>
        </div>
        
        <nav className="flex flex-col gap-2 p-4 flex-1">
          <SidebarLink icon={<Home className="w-5 h-5" />} label="Quiz" active={activePage === 'quiz'} />
          <SidebarLink icon={<PlayCircle className="w-5 h-5" />} label="Practice" active={activePage === 'practice'} />
          <SidebarLink icon={<BarChart3 className="w-5 h-5" />} label="Stats" active={activePage === 'stats'} />
          <SidebarLink icon={<Settings className="w-5 h-5" />} label="Settings" active={activePage === 'settings'} />
        </nav>
        
        <div className="p-4">
          <div className="glass rounded p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 dark:text-white truncate">Guest User</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Level {stats.level}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <header className="glass m-4 mb-0 rounded-2xl">
          <div className="min-h-[88px] px-6 py-4 flex items-center justify-between">
            {/* Left side - Logo on mobile, Stats on desktop */}
            <div className="flex items-center">
              <span className="font-bold text-xl text-gray-900 dark:text-white lg:hidden">DS&A Master</span>
              
              <div className="hidden lg:flex items-center gap-4 text-sm">
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">Level</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.level}</span>
                </div>
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">XP</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.experience % 100}/100</span>
                </div>
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">Streak</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.streak}</span>
                </div>
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">Points</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.totalPoints}</span>
                </div>
              </div>
            </div>

            {/* Right side - Theme toggle and user avatar */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center lg:hidden">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarLink({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean; }) {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 rounded transition-all duration-200 ${
        active 
          ? 'glass bg-gray-900/10 dark:bg-white/10 text-gray-900 dark:text-white' 
          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-900/5 dark:hover:bg-white/5'
      }`}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full glass" />
    )
  }

  return (
    <button
      className="w-10 h-10 p-0 rounded-full glass glass-hover flex items-center justify-center transition-all duration-200"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
} 