import type { Node, Edge } from 'reactflow'

export type NodeStatus = 'Healthy' | 'Degraded' | 'Down'
export type NodeType = 'service' | 'database'

export interface ServiceNodeData {
  label: string
  description?: string
  status: NodeStatus
  nodeType: NodeType
  sliderValue: number
  costPerHour: string
  cpu: number
  memory: number
  disk: number
  region: number
  provider: 'aws' | 'gcp' | 'azure'
}

export type AppNode = Node<ServiceNodeData>
export type AppEdge = Edge

export interface App {
  id: string
  name: string
  icon: string
  color: string
}

export interface GraphData {
  nodes: AppNode[]
  edges: AppEdge[]
}
