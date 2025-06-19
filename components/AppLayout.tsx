'use client'

import { ReactNode } from 'react'
import { Home, BarChart3, Settings, PlayCircle, User, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <span className="font-bold text-2xl text-black dark:text-white tracking-tight">DS&A Master</span>
        </div>
        
        <nav className="flex flex-col gap-1 p-4 flex-1">
          <SidebarLink icon={<Home className="w-5 h-5" />} label="Quiz" active={activePage === 'quiz'} />
          <SidebarLink icon={<PlayCircle className="w-5 h-5" />} label="Practice" active={activePage === 'practice'} />
          <SidebarLink icon={<BarChart3 className="w-5 h-5" />} label="Stats" active={activePage === 'stats'} />
          <SidebarLink icon={<Settings className="w-5 h-5" />} label="Settings" active={activePage === 'settings'} />
        </nav>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-black dark:text-white truncate">Guest User</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Level {stats.level}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm py-4 px-4 lg:px-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:hidden">
              <span className="font-bold text-xl text-black dark:text-white tracking-tight">DS&A Master</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Level</span>
                <span className="font-semibold text-black dark:text-white">{stats.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">XP</span>
                <span className="font-semibold text-black dark:text-white">{stats.experience % 100}/100</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Streak</span>
                <span className="font-semibold text-black dark:text-white">{stats.streak}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Points</span>
                <span className="font-semibold text-black dark:text-white">{stats.totalPoints}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center lg:hidden">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarLink({ icon, label, active }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <Button 
      variant={active ? 'secondary' : 'ghost'} 
      className={`justify-start w-full px-3 py-2.5 text-sm font-medium transition-colors ${
        active 
          ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white shadow-sm' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white'
      }`}
      tabIndex={0}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Button>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <Button 
        variant="ghost"
        size="sm" 
        className={`px-3 py-1.5 text-xs font-medium transition-colors ${
          theme === 'light' 
            ? 'bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
        }`}
        onClick={() => setTheme('light')}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4 mr-1.5" />
        Light
      </Button>
      <Button 
        variant="ghost"
        size="sm" 
        className={`px-3 py-1.5 text-xs font-medium transition-colors ${
          theme === 'dark' 
            ? 'bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
        }`}
        onClick={() => setTheme('dark')}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4 mr-1.5" />
        Dark
      </Button>
    </div>
  )
} 