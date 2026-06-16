import { create } from 'zustand'

interface UIStore {
  selectedAppId: string
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: string
  isAppListOpen: boolean
  setSelectedAppId: (id: string) => void
  setSelectedNodeId: (id: string | null) => void
  setIsMobilePanelOpen: (open: boolean) => void
  toggleMobilePanel: () => void
  setActiveInspectorTab: (tab: string) => void
  setIsAppListOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  selectedAppId: 'app-1',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  isAppListOpen: false,

  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  toggleMobilePanel: () =>
    set((state) => ({ isMobilePanelOpen: !state.isMobilePanelOpen })),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
  setIsAppListOpen: (open) => set({ isAppListOpen: open }),
}))
