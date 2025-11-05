import './App.css';
import ToolBar from './components/ToolBar';
import ControlPanel from './components/ControlPanel';
import CanvasArea from './components/CanvasArea';
import LayersPanel from './components/LayersPanel';

function App() {

  return (
    <div className="app">
      <div className="top-bar">
        <ToolBar />
        <ControlPanel />
      </div>
      <div className="main-area">
        <div className="canvas-area">
          <CanvasArea />
        </div>
        <div className="layers-panel">
          <LayersPanel />
        </div>
      </div>
    </div>
  )
}

export default App
