import { COLORS, usePaintStore } from '../store/usePaintStore'
import type { PaintState } from '../store/usePaintStore'

export default function ControlPanel() {
  const tool = usePaintStore((s: PaintState) => s.tool)
  const shape = usePaintStore((s: PaintState) => s.shapeOptions.shape)
  const shapeColor = usePaintStore((s: PaintState) => s.shapeOptions.color)
  const shapeSize = usePaintStore((s: PaintState) => s.shapeOptions.size)
  const fillColor = usePaintStore((s: PaintState) => s.fillOptions.color)
  const brushColor = usePaintStore((s: PaintState) => s.brushOptions.color)
  const brushSize = usePaintStore((s: PaintState) => s.brushOptions.size)
  const setShape = usePaintStore((s: PaintState) => s.setShape)
  const setShapeColor = usePaintStore((s: PaintState) => s.setShapeColor)
  const setShapeSize = usePaintStore((s: PaintState) => s.setShapeSize)
  const setFillColor = usePaintStore((s: PaintState) => s.setFillColor)
  const setBrushColor = usePaintStore((s: PaintState) => s.setBrushColor)
  const setBrushSize = usePaintStore((s: PaintState) => s.setBrushSize)

  if (tool === 'none') return null

  return (
    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-md shadow border border-slate-200 p-3 text-sm">
      <div className="font-semibold mb-2">
        {tool === 'shape' ? 'Shape Tool' : tool === 'fill' ? 'Fill Tool' : 'Freeform Brush Tool'}
      </div>
      {tool === 'shape' && (
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs uppercase text-slate-500">Color</div>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  title={c}
                  className={`w-6 h-6 rounded border ${shapeColor === c ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setShapeColor(c)}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs uppercase text-slate-500">Shape</div>
            <div className="flex gap-2">
              <button
                className={`px-2 py-1 rounded border ${shape === 'rect' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white'}`}
                onClick={() => setShape('rect')}
              >
                Rectangle
              </button>
              <button
                className={`px-2 py-1 rounded border ${shape === 'circle' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white'}`}
                onClick={() => setShape('circle')}
              >
                Circle
              </button>
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs uppercase text-slate-500">Size</div>
            <input
              type="range"
              min={40}
              max={200}
              step={5}
              value={shapeSize}
              onChange={(e) => setShapeSize(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}
      {tool === 'fill' && (
        <div>
          <div className="mb-1 text-xs uppercase text-slate-500">Background Color</div>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                title={c}
                className={`w-6 h-6 rounded border ${fillColor === c ? 'ring-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setFillColor(c)}
              />
            ))}
          </div>
        </div>
      )}
      {tool === 'brush' && (
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs uppercase text-slate-500">Color</div>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  title={c}
                  className={`w-6 h-6 rounded border ${brushColor === c ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setBrushColor(c)}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs uppercase text-slate-500">Size</div>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  )
}
