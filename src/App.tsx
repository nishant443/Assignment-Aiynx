import { TopBar } from '@/components/layout/TopBar'
import { LeftRail } from '@/components/layout/LeftRail'
import { RightPanel } from '@/components/layout/RightPanel'
import { Canvas } from '@/components/canvas/Canvas'
import { AppList } from '@/components/layout/AppList'
import { useUIStore } from '@/store/uiStore'

function App() {
  const { isAppListOpen, setIsAppListOpen } = useUIStore()

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0d] text-white overflow-hidden">
      <TopBar />

      {/* Backdrop to close app list */}
      {isAppListOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setIsAppListOpen(false)}
        />
      )}

      {/* App list dropdown (positioned absolutely over the layout) */}
      <div className="relative z-30">
        <AppList />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <LeftRail />
        <Canvas />
        <RightPanel />
      </div>
    </div>
  )
}

export default App
