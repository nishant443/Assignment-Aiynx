import type { App, GraphData } from '@/types'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const APPS: App[] = [
  { id: 'app-1', name: 'supertokens-golang', icon: '⚡', color: '#7C3AED' },
  { id: 'app-2', name: 'supertokens-java', icon: '⚙️', color: '#6366F1' },
  { id: 'app-3', name: 'supertokens-python', icon: '🚀', color: '#EF4444' },
  { id: 'app-4', name: 'supertokens-ruby', icon: '📦', color: '#8B5CF6' },
  { id: 'app-5', name: 'supertokens-go', icon: '🧩', color: '#EC4899' },
]

const GRAPHS: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      {
        id: 'n1',
        type: 'serviceNode',
        position: { x: 80, y: 60 },
        data: {
          label: 'API Gateway',
          description: 'Main API entry point',
          status: 'Healthy',
          nodeType: 'service',
          sliderValue: 42,
          costPerHour: '$0.03/HR',
          cpu: 0.02,
          memory: 0.05,
          disk: 10.0,
          region: 1,
          provider: 'aws',
        },
      },
      {
        id: 'n2',
        type: 'serviceNode',
        position: { x: 480, y: 30 },
        data: {
          label: 'Postgres',
          description: 'Primary database',
          status: 'Healthy',
          nodeType: 'database',
          sliderValue: 78,
          costPerHour: '$0.03/HR',
          cpu: 0.02,
          memory: 0.05,
          disk: 10.0,
          region: 1,
          provider: 'aws',
        },
      },
      {
        id: 'n3',
        type: 'serviceNode',
        position: { x: 80, y: 320 },
        data: {
          label: 'Redis',
          description: 'Cache layer',
          status: 'Down',
          nodeType: 'service',
          sliderValue: 20,
          costPerHour: '$0.03/HR',
          cpu: 0.02,
          memory: 0.05,
          disk: 10.0,
          region: 1,
          provider: 'aws',
        },
      },
      {
        id: 'n4',
        type: 'serviceNode',
        position: { x: 480, y: 330 },
        data: {
          label: 'Mongodb',
          description: 'Document store',
          status: 'Down',
          nodeType: 'database',
          sliderValue: 88,
          costPerHour: '$0.03/HR',
          cpu: 0.02,
          memory: 0.05,
          disk: 10.0,
          region: 1,
          provider: 'aws',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
      { id: 'e1-3', source: 'n1', target: 'n3', animated: true },
      { id: 'e2-4', source: 'n2', target: 'n4', animated: false },
      { id: 'e3-4', source: 'n3', target: 'n4', animated: false },
    ],
  },
  'app-2': {
    nodes: [
      {
        id: 'n1',
        type: 'serviceNode',
        position: { x: 100, y: 80 },
        data: {
          label: 'Auth Service',
          description: 'Java auth microservice',
          status: 'Healthy',
          nodeType: 'service',
          sliderValue: 55,
          costPerHour: '$0.05/HR',
          cpu: 0.04,
          memory: 0.12,
          disk: 20.0,
          region: 1,
          provider: 'aws',
        },
      },
      {
        id: 'n2',
        type: 'serviceNode',
        position: { x: 450, y: 80 },
        data: {
          label: 'MySQL',
          description: 'Relational DB',
          status: 'Degraded',
          nodeType: 'database',
          sliderValue: 30,
          costPerHour: '$0.04/HR',
          cpu: 0.03,
          memory: 0.08,
          disk: 50.0,
          region: 2,
          provider: 'aws',
        },
      },
      {
        id: 'n3',
        type: 'serviceNode',
        position: { x: 250, y: 280 },
        data: {
          label: 'Cache',
          description: 'Redis cache',
          status: 'Healthy',
          nodeType: 'service',
          sliderValue: 67,
          costPerHour: '$0.02/HR',
          cpu: 0.01,
          memory: 0.04,
          disk: 5.0,
          region: 1,
          provider: 'aws',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
      { id: 'e1-3', source: 'n1', target: 'n3', animated: false },
    ],
  },
  'app-3': {
    nodes: [
      {
        id: 'n1',
        type: 'serviceNode',
        position: { x: 200, y: 100 },
        data: {
          label: 'Python API',
          description: 'FastAPI backend',
          status: 'Healthy',
          nodeType: 'service',
          sliderValue: 60,
          costPerHour: '$0.03/HR',
          cpu: 0.02,
          memory: 0.06,
          disk: 15.0,
          region: 1,
          provider: 'gcp',
        },
      },
      {
        id: 'n2',
        type: 'serviceNode',
        position: { x: 500, y: 100 },
        data: {
          label: 'PostgreSQL',
          description: 'Main DB',
          status: 'Healthy',
          nodeType: 'database',
          sliderValue: 45,
          costPerHour: '$0.04/HR',
          cpu: 0.03,
          memory: 0.1,
          disk: 30.0,
          region: 1,
          provider: 'gcp',
        },
      },
      {
        id: 'n3',
        type: 'serviceNode',
        position: { x: 350, y: 320 },
        data: {
          label: 'Celery Worker',
          description: 'Background tasks',
          status: 'Degraded',
          nodeType: 'service',
          sliderValue: 15,
          costPerHour: '$0.02/HR',
          cpu: 0.01,
          memory: 0.03,
          disk: 5.0,
          region: 2,
          provider: 'gcp',
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'n1', target: 'n2', animated: true },
      { id: 'e1-3', source: 'n1', target: 'n3', animated: true },
    ],
  },
}

// Fill missing app graphs with a default
for (const app of APPS) {
  if (!GRAPHS[app.id]) {
    GRAPHS[app.id] = GRAPHS['app-1']
  }
}

let shouldError = false

export function toggleError() {
  shouldError = !shouldError
}

export async function fetchApps(): Promise<App[]> {
  await delay(600)
  if (shouldError) throw new Error('Failed to fetch apps')
  return APPS
}

export async function fetchGraph(appId: string): Promise<GraphData> {
  await delay(800)
  if (shouldError) throw new Error('Failed to fetch graph')
  return GRAPHS[appId] ?? GRAPHS['app-1']
}
