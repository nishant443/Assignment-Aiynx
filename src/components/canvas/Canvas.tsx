import { useCallback, useEffect, useMemo } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type NodeTypes,
  useReactFlow,
  ReactFlowProvider,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { ServiceNode } from './ServiceNode'
import { useGraph } from '@/hooks/useQueries'
import { useUIStore } from '@/store/uiStore'
import type { AppNode, AppEdge, ServiceNodeData } from '@/types'
import { Maximize2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const nodeTypes: NodeTypes = {
  serviceNode: ServiceNode,
}

function CanvasInner() {
  const { selectedAppId, setSelectedNodeId, selectedNodeId } = useUIStore()
  const { data: graphData, isLoading, isError, refetch } = useGraph(selectedAppId)

  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNodeData>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>([])
  const { fitView } = useReactFlow()

  // Sync graph data into ReactFlow state when it changes
  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes as AppNode[])
      setEdges(graphData.edges)
      setTimeout(() => fitView({ padding: 0.15 }), 100)
    }
  }, [graphData, setNodes, setEdges, fitView])

  // Sync selectedNodeId into node selected state
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, selected: n.id === selectedNodeId }))
    )
  }, [selectedNodeId, setNodes])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: AppNode) => {
      setSelectedNodeId(node.id)
    },
    [setSelectedNodeId]
  )

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [setSelectedNodeId])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId))
        setEdges((eds) =>
          eds.filter(
            (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
          )
        )
        setSelectedNodeId(null)
      }
    },
    [selectedNodeId, setNodes, setEdges, setSelectedNodeId]
  )

  const handleAddNode = useCallback(() => {
    const id = `node-${Date.now()}`
    const newNode: AppNode = {
      id,
      type: 'serviceNode',
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      data: {
        label: 'New Service',
        description: '',
        status: 'Healthy',
        nodeType: 'service',
        sliderValue: 50,
        costPerHour: '$0.03/HR',
        cpu: 0.02,
        memory: 0.05,
        disk: 10.0,
        region: 1,
        provider: 'aws',
      },
    }
    setNodes((nds) => [...nds, newNode])
    setSelectedNodeId(id)
  }, [setNodes, setSelectedNodeId])

  const updateNodeSlider = useCallback(
    (nodeId: string, value: number) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...n.data, sliderValue: value } }
            : n
        )
      )
    },
    [setNodes]
  )

  const updateNodeLabel = useCallback(
    (nodeId: string, label: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
        )
      )
    },
    [setNodes]
  )

  // Expose update functions to window for inspector to call
  useEffect(() => {
    ;(window as unknown as Record<string, unknown>).__graphUpdateSlider = updateNodeSlider;
    (window as unknown as Record<string, unknown>).__graphUpdateLabel = updateNodeLabel
  }, [updateNodeSlider, updateNodeLabel])

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId]
  )

  // Store selected node data in a ref for the inspector
  useEffect(() => {
    ;(window as unknown as Record<string, unknown>).__selectedNodeData = selectedNode?.data ?? null
  }, [selectedNode])

  return (
    <div
      className="flex-1 relative focus:outline-none"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d0d0d]/80">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading graph...</p>
          </div>
        </div>
      )}

      {isError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0d0d0d]/80">
          <div className="flex flex-col items-center gap-3">
            <p className="text-red-400 text-sm">Failed to load graph</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void refetch()}
              className="border-[#333] text-gray-300"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
        maxZoom={2}
        className="bg-[#0d0d0d]"
        defaultEdgeOptions={{
          style: { stroke: '#444', strokeWidth: 1.5 },
          type: 'smoothstep',
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#2a2a2a"
        />
        <Controls className="!bg-[#161616] !border-[#2a2a2a] !shadow-none" />
        <MiniMap
          className="!bg-[#161616] !border-[#2a2a2a]"
          nodeColor="#444"
          maskColor="rgba(0,0,0,0.6)"
        />
        <Panel position="top-right">
          <Button
            size="sm"
            onClick={handleAddNode}
            className="bg-purple-600 hover:bg-purple-500 text-white border-0 gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Node
          </Button>
        </Panel>
        <Panel position="top-left">
          <Button
            size="sm"
            variant="outline"
            onClick={() => fitView({ padding: 0.15, duration: 400 })}
            className="border-[#333] bg-[#161616] text-gray-300 hover:bg-[#252525] gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Fit
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}
