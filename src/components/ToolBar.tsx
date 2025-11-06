import { usePaintStore } from '../store/usePaintStore'
import type { PaintState } from '../store/usePaintStore'
import type { ToolType } from '../types'

const ToolButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
      active ? 'bg-blue-600 text-white border-blue-700' : 'bg-white hover:bg-slate-50 border-slate-300'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default function Toolbar() {
  const tool = usePaintStore((s: PaintState) => s.tool)
  const setTool = usePaintStore((s: PaintState) => s.setTool)

  const changeTool = (t: ToolType) => () => setTool(t)

  return (
    <div className="w-full border-b border-slate-200 bg-white p-2 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <ToolButton active={tool === 'shape'} onClick={changeTool('shape')}>Shape</ToolButton>
        <ToolButton active={tool === 'fill'} onClick={changeTool('fill')}>Fill</ToolButton>
        <ToolButton active={tool === 'none'} onClick={changeTool('none')}>None</ToolButton>
      </div>
    </div>
  )
}
