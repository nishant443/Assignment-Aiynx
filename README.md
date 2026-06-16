# App Graph Builder

A modern React-based UI prototype for building and inspecting application service graphs.

## What this application does

`App Graph Builder` is a visual tool for exploring service topology and node configuration in a mock application environment. It displays a directed graph of services and databases, allows users to:

- browse multiple app graphs from an app selector,
- inspect individual service nodes,
- edit node metadata and resource allocation,
- add new nodes to the graph,
- remove nodes with keyboard shortcuts,
- simulate loading and API error states.

The goal is to showcase a polished developer UX for application architecture visualization and interactive node inspection.

## Goals

- Provide a clean, dashboard-style interface for viewing app graphs.
- Demonstrate node-level configuration and runtime details without a real backend.
- Build a responsive layout that works on desktop and mobile.
- Use modern React tooling and a component-first architecture.
- Keep the graph interaction intuitive: drag, connect, select, add, delete.

## Tech stack

- `React 18`
- `TypeScript`
- `Vite` for development and build tooling
- `ReactFlow` for graph rendering and interactive node connections
- `@tanstack/react-query` for mocked data fetching and caching
- `Zustand` for lightweight UI state management
- `Tailwind CSS` for styling
- `Lucide React` for icons
- `ESLint` + `TypeScript` for linting and type safety

## Application overview

### Layout

- `TopBar` contains the app selector, error simulation toggle, theme icon, and mobile inspector toggle.
- `LeftRail` provides a compact side navigation area.
- `Canvas` is the central ReactFlow graph area, showing nodes and edges.
- `RightPanel` is the node inspector, which becomes a slide-over drawer on mobile.
- `AppList` is a dropdown for switching between mock applications.

### Data flow

- App list and graph payloads are served by mock APIs in `src/mocks/api.ts`.
- `useQueries.ts` provides hooks for app list and graph data retrieval using TanStack Query.
- UI state like selected app, selected node, active inspector tab, and mobile panel open state is stored in `src/store/uiStore.ts`.
- Graph node updates are synchronized from the canvas to the inspector via a lightweight window bridge.

### Graph interactions

- Drag nodes around the canvas.
- Click a node to open it in the inspector.
- Press `Delete` or `Backspace` to remove the selected node and connected edges.
- Use the `Fit` button to recenter and scale the graph.
- Add a new service node with the `Add Node` button.
- Connect nodes interactively using ReactFlow connections.

## Important features

- **Mock multi-app support**: select from several preconfigured applications and load a different graph for each.
- **Graph rendering with ReactFlow**: custom node type (`ServiceNode`) with handles, animated edges, mini map, background grid, and zoom controls.
- **Custom node card UI**: nodes display service icon, name, resource stats, cost, status badge, and provider branding.
- **Node Inspector**: 3-tab detail panel with `Config`, `Runtime`, and `Logs` views.
- **Editable node configuration**: node name and CPU allocation can be updated from the inspector.
- **Slider + numeric sync**: slider and input stay in sync for CPU allocation changes.
- **Responsive inspector**: desktop side panel and mobile drawer share the same inspector content.
- **Error simulation**: top bar button toggles mock API error mode and invalidates queries.
- **Loading/error UI**: the canvas displays loading overlays and retry actions while fetching graph data.

## How to run

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Available scripts

- `npm run dev` — Start the Vite development server.
- `npm run build` — Run TypeScript type checking and build the production bundle.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint over the source files.
- `npm run typecheck` — Run `tsc --noEmit` to verify types.

## Project structure

- `src/App.tsx` — main layout and page shell.
- `src/components/canvas/Canvas.tsx` — graph container and ReactFlow integration.
- `src/components/canvas/ServiceNode.tsx` — custom graph node UI.
- `src/components/inspector/NodeInspector.tsx` — node details panel.
- `src/components/layout/TopBar.tsx` — top navigation and controls.
- `src/components/layout/RightPanel.tsx` — inspector panel / mobile drawer.
- `src/store/uiStore.ts` — Zustand UI state.
- `src/mocks/api.ts` — mocked apps and graph payloads.
- `src/hooks/useQueries.ts` — React Query hooks for app and graph data.
- `src/types/index.ts` — domain types used across the app.

## Notes

- The app uses mock data, so it is intended as a UI demo rather than a production graph management system.
- The current inspector update mechanism relies on a simple window bridge. In a larger app, this could be replaced with shared state or context.
- `msw` is included in dependencies but not used in the current mock implementation.
