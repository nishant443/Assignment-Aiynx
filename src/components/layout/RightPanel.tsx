import { NodeInspector } from '@/components/inspector/NodeInspector'
import { useUIStore } from '@/store/uiStore'
import { Dialog, DialogContent } from '@/components/ui/dialog'

function PanelContent() {
  return (
    <div className="flex flex-col h-full bg-[#111111]">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-[#2a2a2a] flex-shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Node Inspector
        </p>
      </div>

      {/* Inspector */}
      <div className="flex-1 overflow-y-auto">
        <NodeInspector />
      </div>
    </div>
  )
}

export function RightPanel() {
  const { isMobilePanelOpen, setIsMobilePanelOpen } = useUIStore()

  return (
    <>
      {/* Desktop panel */}
      <aside className="hidden lg:flex w-72 border-l border-[#2a2a2a] flex-shrink-0 flex-col">
        <PanelContent />
      </aside>

      {/* Mobile slide-over drawer */}
      <Dialog open={isMobilePanelOpen} onOpenChange={setIsMobilePanelOpen}>
        <DialogContent className="p-0 w-80 h-full overflow-hidden">
          <PanelContent />
        </DialogContent>
      </Dialog>
    </>
  )
}
