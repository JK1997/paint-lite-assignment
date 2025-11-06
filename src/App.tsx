import Toolbar from './components/ToolBar'
import LayersPanel from './components/LayersPanel'
import CanvasBoard from './components/CanvasArea'
import ControlPanel from './components/ControlPanel'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1">
          <CanvasBoard />
          <ControlPanel />
        </div>
        <LayersPanel />
      </div>
    </div>
  )
}

export default App
