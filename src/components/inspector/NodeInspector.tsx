import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/store/uiStore'
import type { NodeStatus, ServiceNodeData } from '@/types'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<NodeStatus, { color: string; bg: string; border: string; icon: string }> = {
  Healthy: {
    color: 'text-green-400',
    bg: 'bg-green-950/40',
    border: 'border-green-800/60',
    icon: '✓',
  },
  Degraded: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-950/40',
    border: 'border-yellow-800/60',
    icon: '⚠',
  },
  Down: {
    color: 'text-red-400',
    bg: 'bg-red-950/40',
    border: 'border-red-800/60',
    icon: '✕',
  },
}

function StatusPill({ status }: { status: NodeStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border',
        cfg.bg,
        cfg.color,
        cfg.border
      )}
    >
      <span>{cfg.icon}</span>
      {status}
    </span>
  )
}

export function NodeInspector() {
  const { selectedNodeId, activeInspectorTab, setActiveInspectorTab } = useUIStore()
  const [nodeData, setNodeData] = useState<ServiceNodeData | null>(null)
  const [sliderVal, setSliderVal] = useState(50)
  const [label, setLabel] = useState('')

  // Poll for node data updates (since we're using a window global bridge)
  useEffect(() => {
    const interval = setInterval(() => {
      const data = (window as unknown as Record<string, unknown>).__selectedNodeData as ServiceNodeData | null
      if (data) {
        setNodeData(data)
        setSliderVal(data.sliderValue)
        setLabel(data.label)
      } else {
        setNodeData(null)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [selectedNodeId])

  const handleSliderChange = (val: number) => {
    setSliderVal(val)
    if (selectedNodeId) {
      const updater = (window as unknown as Record<string, unknown>).__graphUpdateSlider as ((id: string, val: number) => void) | undefined
      updater?.(selectedNodeId, val)
    }
  }

  const handleLabelChange = (val: string) => {
    setLabel(val)
    if (selectedNodeId) {
      const updater = (window as unknown as Record<string, unknown>).__graphUpdateLabel as ((id: string, val: string) => void) | undefined
      updater?.(selectedNodeId, val)
    }
  }

  if (!selectedNodeId || !nodeData) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
        <div className="w-12 h-12 rounded-xl bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-xl">
          🔍
        </div>
        <p className="text-gray-500 text-sm">Select a node to inspect</p>
        <p className="text-gray-600 text-xs">Click any node on the canvas to view its details</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#252525] flex items-center justify-center text-sm border border-[#333]">
            {nodeData.nodeType === 'database' ? '🗄️' : '⚡'}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{nodeData.label}</p>
            <p className="text-xs text-gray-500 capitalize">{nodeData.nodeType} node</p>
          </div>
        </div>
        <StatusPill status={nodeData.status} />
      </div>

      {/* Tabs */}
      <Tabs value={activeInspectorTab} onValueChange={setActiveInspectorTab}>
        <TabsList className="w-full bg-[#1a1a1a] border border-[#2a2a2a]">
          <TabsTrigger
            value="config"
            className="flex-1 text-xs data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white"
          >
            Config
          </TabsTrigger>
          <TabsTrigger
            value="runtime"
            className="flex-1 text-xs data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white"
          >
            Runtime
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="flex-1 text-xs data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white"
          >
            Logs
          </TabsTrigger>
        </TabsList>

        {/* Config Tab */}
        <TabsContent value="config" className="mt-3 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Node Name</label>
            <Input
              value={label}
              onChange={(e) => handleLabelChange(e.target.value)}
              className="bg-[#1a1a1a] border-[#333] text-sm text-white h-8 focus-visible:ring-purple-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Description</label>
            <textarea
              defaultValue={nodeData.description}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-3 py-2 text-sm text-white resize-none h-16 outline-none focus:ring-1 focus:ring-purple-500/50"
              placeholder="Service description..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-400 font-medium">CPU Allocation (%)</label>
              <span className="text-xs text-gray-300 font-mono">{sliderVal}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Slider
                value={[sliderVal]}
                onValueChange={([v]) => handleSliderChange(v ?? 0)}
                min={0}
                max={100}
                step={1}
                className="flex-1 [&_[role=slider]]:bg-white [&_[role=slider]]:border-gray-300 [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-blue-500 [&_.bg-primary]:to-purple-500"
              />
              <Input
                type="number"
                value={sliderVal}
                onChange={(e) => {
                  const v = Math.min(100, Math.max(0, Number(e.target.value)))
                  handleSliderChange(v)
                }}
                className="w-16 bg-[#1a1a1a] border-[#333] text-sm text-white h-8 text-center focus-visible:ring-purple-500/50"
                min={0}
                max={100}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Cost/Hour</label>
            <Input
              defaultValue={nodeData.costPerHour}
              className="bg-[#1a1a1a] border-[#333] text-sm text-white h-8 focus-visible:ring-purple-500/50"
              readOnly
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Provider</label>
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-md px-3 h-8">
              <span className="text-base">☁️</span>
              <span className="text-sm text-yellow-400 font-bold uppercase">{nodeData.provider}</span>
            </div>
          </div>
        </TabsContent>

        {/* Runtime Tab */}
        <TabsContent value="runtime" className="mt-3 space-y-3">
          {[
            { label: 'CPU Usage', value: `${nodeData.cpu} cores` },
            { label: 'Memory', value: `${nodeData.memory} GB / 10 GB` },
            { label: 'Disk', value: `${nodeData.disk} GB` },
            { label: 'Region', value: `us-east-${nodeData.region}` },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2 border-b border-[#1e1e1e]"
            >
              <span className="text-xs text-gray-500">{item.label}</span>
              <span className="text-xs font-mono text-gray-200">{item.value}</span>
            </div>
          ))}

          <div className="mt-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Uptime</span>
              <span className={cn(
                'text-xs font-medium',
                nodeData.status === 'Healthy' ? 'text-green-400' : nodeData.status === 'Degraded' ? 'text-yellow-400' : 'text-red-400'
              )}>
                {nodeData.status === 'Healthy' ? '99.9%' : nodeData.status === 'Degraded' ? '87.2%' : '0%'}
              </span>
            </div>
            <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full',
                  nodeData.status === 'Healthy' ? 'bg-green-500' : nodeData.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'
                )}
                style={{ width: nodeData.status === 'Healthy' ? '99.9%' : nodeData.status === 'Degraded' ? '87.2%' : '0%' }}
              />
            </div>
          </div>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="mt-3">
          <div className="bg-[#0d0d0d] rounded-lg border border-[#1e1e1e] p-3 font-mono text-xs space-y-1 h-48 overflow-y-auto">
            {nodeData.status === 'Down' ? (
              <>
                <p className="text-red-400">[ERROR] Connection refused: port 6379</p>
                <p className="text-red-400">[ERROR] Max retry attempts exceeded</p>
                <p className="text-yellow-400">[WARN] Health check failed 3/3</p>
                <p className="text-gray-500">[INFO] Service marked as Down</p>
              </>
            ) : nodeData.status === 'Degraded' ? (
              <>
                <p className="text-yellow-400">[WARN] High memory usage: 87%</p>
                <p className="text-yellow-400">[WARN] Slow query detected: 2400ms</p>
                <p className="text-green-400">[INFO] Connection pool: 48/50</p>
                <p className="text-gray-400">[INFO] Last request: 200ms ago</p>
              </>
            ) : (
              <>
                <p className="text-green-400">[INFO] Service started successfully</p>
                <p className="text-green-400">[INFO] Health check passed</p>
                <p className="text-gray-400">[INFO] Listening on port 8080</p>
                <p className="text-gray-400">[INFO] Connected to upstream services</p>
                <p className="text-gray-500">[DEBUG] Memory: 12% / 10 GB</p>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
