import { ChevronDown, MoreHorizontal, Share2, Moon, Sun, Maximize2, PanelRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/uiStore'
import { useApps } from '@/hooks/useQueries'
import { toggleError } from '@/mocks/api'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function TopBar() {
  const { selectedAppId, setIsAppListOpen, isAppListOpen, toggleMobilePanel } = useUIStore()
  const { data: apps } = useApps()
  const queryClient = useQueryClient()
  const [isDark, setIsDark] = useState(true)

  const selectedApp = apps?.find((a) => a.id === selectedAppId)

  const handleToggleError = () => {
    toggleError()
    void queryClient.invalidateQueries()
  }

  return (
    <header className="h-12 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between px-3 flex-shrink-0 z-20">
      {/* Left: Brand + App selector */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#1e1e2e] rounded-md flex items-center justify-center border border-[#333]">
          <span className="text-purple-400 text-sm font-bold">Z</span>
        </div>

        <button
          onClick={() => setIsAppListOpen(!isAppListOpen)}
          className="flex items-center gap-2 bg-[#1e1e1e] border border-[#333] rounded-md px-3 py-1.5 text-sm text-white hover:bg-[#252525] transition-colors"
        >
          <span
            className="w-5 h-5 rounded-sm flex items-center justify-center text-xs"
            style={{ backgroundColor: selectedApp?.color ?? '#7C3AED' }}
          >
            ⚡
          </span>
          <span className="text-sm font-medium">{selectedApp?.name ?? 'Select App'}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          <MoreHorizontal className="w-3.5 h-3.5 text-gray-400 ml-1" />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-[#252525]"
          onClick={handleToggleError}
          title="Toggle error simulation"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-[#252525]"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-[#252525]"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        {/* Mobile panel toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-[#252525] lg:hidden"
          onClick={toggleMobilePanel}
        >
          <PanelRight className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
          N
        </div>
      </div>
    </header>
  )
}
