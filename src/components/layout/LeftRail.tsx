import { Github, Database, Box, Leaf, Layers, Network } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const NAV_ITEMS = [
  { icon: Github, label: 'GitHub' },
  { icon: Database, label: 'Database' },
  { icon: Box, label: 'Redis' },
  { icon: Leaf, label: 'MongoDB' },
  { icon: Layers, label: 'Layers' },
  { icon: Network, label: 'Network' },
]

export function LeftRail() {
  const [active, setActive] = useState(0)

  return (
    <aside className="w-12 bg-[#111111] border-r border-[#2a2a2a] flex flex-col items-center py-3 gap-2 flex-shrink-0">
      {NAV_ITEMS.map((item, i) => (
        <button
          key={item.label}
          onClick={() => setActive(i)}
          title={item.label}
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
            active === i
              ? 'bg-[#252525] text-white'
              : 'text-gray-500 hover:text-gray-300 hover:bg-[#1e1e1e]'
          )}
        >
          <item.icon className="w-4 h-4" />
        </button>
      ))}
    </aside>
  )
}
