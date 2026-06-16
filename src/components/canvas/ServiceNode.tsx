import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import type { ServiceNodeData } from '@/types'
import { Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  Healthy: {
    bg: 'bg-green-950/60 border-green-700/50',
    text: 'text-green-400',
    dot: 'bg-green-400',
    label: 'Success',
  },
  Degraded: {
    bg: 'bg-yellow-950/60 border-yellow-700/50',
    text: 'text-yellow-400',
    dot: 'bg-yellow-400',
    label: 'Degraded',
  },
  Down: {
    bg: 'bg-red-950/60 border-red-800/50',
    text: 'text-red-400',
    dot: 'bg-red-500',
    label: 'Error',
  },
}

const NODE_ICONS: Record<string, string> = {
  'API Gateway': '⚡',
  Postgres: '🐘',
  Redis: '🧱',
  Mongodb: '🍃',
  MySQL: '🐬',
  PostgreSQL: '🐘',
  Cache: '⚡',
  'Auth Service': '🔐',
  'Python API': '🐍',
  'Celery Worker': '⚙️',
}

const PROVIDER_LOGO = '☁️'

// Colorful gradient for slider based on value
function getSliderGradient(value: number) {
  if (value < 30) return 'from-blue-600 via-cyan-400 to-emerald-400'
  if (value < 60) return 'from-blue-600 via-green-400 to-yellow-400'
  return 'from-blue-600 via-green-400 to-red-500'
}

interface ServiceNodeProps extends NodeProps<ServiceNodeData> {}

export const ServiceNode = memo(({ data, selected }: ServiceNodeProps) => {
  const status = STATUS_STYLES[data.status] ?? STATUS_STYLES['Down']
  const icon = NODE_ICONS[data.label] ?? '📦'

  const pct = Math.min(100, Math.max(0, data.sliderValue))

  return (
    <div
      className={cn(
        'w-[300px] bg-[#161616] border rounded-xl overflow-hidden shadow-xl transition-all',
        selected ? 'border-purple-500 ring-1 ring-purple-500/40' : 'border-[#2a2a2a]'
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-purple-500 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500 !w-2 !h-2 !border-0" />
      <Handle type="source" position={Position.Right} className="!bg-purple-500 !w-2 !h-2 !border-0" />
      <Handle type="target" position={Position.Left} className="!bg-purple-500 !w-2 !h-2 !border-0" />

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-semibold text-white">{data.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-green-400 bg-green-950/80 border border-green-800/60 px-2 py-0.5 rounded-md">
            {data.costPerHour}
          </span>
          <button className="text-gray-500 hover:text-gray-300 transition-colors">
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 px-3 pb-2 text-center gap-1">
        <div>
          <p className="text-[10px] text-gray-500">CPU</p>
          <p className="text-[11px] text-gray-300 font-mono">{data.cpu}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500">{data.memory} GB</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500">{data.disk} GB</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500">{data.region}</p>
        </div>
      </div>

      {/* Tab selector */}
      <div className="px-3 pb-2">
        <div className="flex bg-[#1a1a1a] rounded-lg p-0.5 text-[11px] gap-0.5">
          {['CPU', 'Memory', 'Disk', 'Region'].map((tab, i) => (
            <button
              key={tab}
              className={cn(
                'flex-1 py-1 rounded-md flex items-center justify-center gap-1 transition-colors',
                i === 0
                  ? 'bg-[#2a2a2a] text-white'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <span>{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="px-3 pb-3 flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full overflow-hidden bg-[#222] relative">
          <div
            className={cn('h-full rounded-full bg-gradient-to-r', getSliderGradient(pct))}
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-gray-300 shadow"
            style={{ left: `calc(${pct}% - 7px)` }}
          />
        </div>
        <span className="text-xs font-mono text-gray-300 w-10 text-right">
          {(pct / 100 * 0.1).toFixed(2)}
        </span>
      </div>

      {/* Footer: status + provider */}
      <div className="flex items-center justify-between px-3 pb-3">
        <span
          className={cn(
            'text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border',
            status.bg,
            status.text
          )}
        >
          {data.status === 'Down' ? '⚠' : '✓'} {status.label}
        </span>
        <span className="text-xl">
          {PROVIDER_LOGO} <span className="text-[10px] text-yellow-400 font-bold">aws</span>
        </span>
      </div>
    </div>
  )
})

ServiceNode.displayName = 'ServiceNode'
