# App Graph Builder

A modern React-based UI prototype for building and inspecting application service graphs.

🔗 **Live Demo:** [https://assignment-aiynx.vercel.app/](https://assignment-aiynx.vercel.app/)

---

## Overview

App Graph Builder is a visual tool for exploring service topology and node configuration in a mock application environment. It displays a directed graph of services and databases, and allows users to:

- Browse multiple app graphs from an app selector
- Inspect individual service nodes
- Edit node metadata and resource allocation
- Add new nodes to the graph
- Remove nodes with keyboard shortcuts
- Simulate loading and API error states

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | Core framework and build tooling |
| TypeScript (strict) | Type safety across all components |
| ReactFlow (xyflow) | Interactive graph rendering and node connections |
| TanStack Query | Mock data fetching, caching, loading/error states |
| Zustand | Lightweight UI state management |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | UI components (tabs, inputs, badges, sliders) |
| Lucide React | Icon library |
| ESLint + TypeScript | Linting and type checking |

---

## Features

### Layout
- **TopBar** — App selector, error simulation toggle, theme icon, mobile inspector toggle
- **LeftRail** — Compact icon-style side navigation
- **Canvas** — Central ReactFlow graph area with dotted background, nodes, and edges
- **RightPanel** — Node inspector that becomes a slide-over drawer on mobile

### Graph Interactions
- Drag nodes freely around the canvas
- Click a node to open it in the inspector
- Press `Delete` or `Backspace` to remove the selected node and its edges
- `Fit` button to recenter and scale the graph to fit the screen
- `Add Node` button to create a new service node
- Connect nodes interactively using ReactFlow handles

### Node Inspector (3 Tabs)
| Tab | Content |
|---|---|
| Config | Editable node name, CPU slider synced with numeric input |
| Runtime | Live-like resource stats for the selected service |
| Logs | Mock log output stream |

### Mock API & Data
- `GET /apps` — Returns a list of preconfigured applications
- `GET /apps/:appId/graph` — Returns nodes + edges for the selected app
- Simulated latency, loading states, and error toggling via TanStack Query

### State Management (Zustand)
- `selectedAppId` — Currently active application
- `selectedNodeId` — Currently selected graph node
- `isMobilePanelOpen` — Controls the mobile drawer
- `activeInspectorTab` — Active tab in the node inspector

---

## Setup Instructions

### Prerequisites
- Node.js `>= 18.x`
- npm `>= 9.x`

### Installation

```bash
# Clone the repository
git clone https://github.com/nishant443/Assignment-Aiynx.git
cd Assignment-Aiynx

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev        # Start Vite development server
npm run build      # Type check + build production bundle
npm run preview    # Preview production build locally
npm run lint       # Run ESLint over source files
npm run typecheck  # Run tsc --noEmit to verify types
```

---

## Project Structure

```
src/
├── App.tsx                          # Main layout and page shell
├── components/
│   ├── canvas/
│   │   ├── Canvas.tsx               # ReactFlow graph container
│   │   └── ServiceNode.tsx          # Custom graph node UI
│   ├── inspector/
│   │   └── NodeInspector.tsx        # Node details panel (tabs + controls)
│   └── layout/
│       ├── TopBar.tsx               # Top navigation and controls
│       └── RightPanel.tsx           # Inspector panel / mobile drawer
├── store/
│   └── uiStore.ts                   # Zustand UI state
├── mocks/
│   └── api.ts                       # Mock app and graph data
├── hooks/
│   └── useQueries.ts                # TanStack Query hooks
└── types/
    └── index.ts                     # Domain types
```

---

## Key Decisions

**Mock API approach** — Used a simple `setTimeout`-based Promise wrapper in `src/mocks/api.ts` instead of MSW to keep setup minimal while still demonstrating TanStack Query's loading, error, and caching behavior correctly.

**Window bridge for node sync** — Node updates from the canvas are synced to the inspector via a lightweight `window` event bridge. In a production app this would be replaced with shared Zustand state or React context.

**Zustand over Context** — Zustand was chosen for UI state to avoid prop drilling across the deep layout tree (TopBar → Canvas → Inspector) while keeping state minimal and selector-friendly.

**shadcn/ui** — Used for Tabs, Slider, Input, and Badge components to keep the inspector UI consistent and accessible without custom component overhead.

---

## Known Limitations

- The app uses mock data only — it is a UI demo, not a production graph management system
- `msw` is listed as a dependency but not actively used in the current mock implementation
- The window bridge sync mechanism is intentionally simple; it would not scale to complex multi-panel state in a larger app
- Node positions are not persisted between app switches

---

## Bonus Features Implemented

- ✅ Add Node button (creates a new service node on the canvas)
- ✅ Node types — Service vs Database with different styling
- ✅ Inspector edits (name + CPU) persisted into ReactFlow node data
- ✅ Error simulation toggle in TopBar

---

## Live Demo

👉 [https://assignment-aiynx.vercel.app/](https://assignment-aiynx.vercel.app/)
