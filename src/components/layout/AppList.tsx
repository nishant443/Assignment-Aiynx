import { Search, Plus, ChevronRight } from 'lucide-react'
import { useApps } from '@/hooks/useQueries'
import { useUIStore } from '@/store/uiStore'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function AppList() {
  const { isAppListOpen, selectedAppId, setSelectedAppId, setIsAppListOpen } = useUIStore()
  const { data: apps, isLoading, isError } = useApps()
  const [search, setSearch] = useState('')

  if (!isAppListOpen) return null

  const filtered = apps?.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="absolute top-12 left-12 z-30 w-72 bg-[#161616] border border-[#2a2a2a] rounded-lg shadow-2xl overflow-hidden">
      <div className="p-3 border-b border-[#2a2a2a]">
        <p className="text-white font-semibold text-sm mb-3">Application</p>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-[#1e1e1e] border border-[#333] rounded-md px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-sm text-white placeholder:text-gray-500 outline-none w-full"
            />
          </div>
          <button className="w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-md flex items-center justify-center flex-shrink-0 transition-colors">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="py-1 max-h-72 overflow-y-auto">
        {isLoading && (
          <div className="px-3 py-8 text-center text-gray-500 text-sm">Loading...</div>
        )}
        {isError && (
          <div className="px-3 py-8 text-center text-red-400 text-sm">Failed to load apps</div>
        )}
        {filtered?.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              setSelectedAppId(app.id)
              setIsAppListOpen(false)
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#252525] transition-colors text-left',
              selectedAppId === app.id && 'bg-[#252525]'
            )}
          >
            <span
              className="w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0"
              style={{ backgroundColor: app.color }}
            >
              {app.icon}
            </span>
            <span className="text-sm text-gray-200 flex-1">{app.name}</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  )
}
