import { usePaintStore } from '../store/usePaintStore'
import type { PaintState } from '../store/usePaintStore'

export default function LayersPanel() {
  const layers = usePaintStore((s: PaintState) => s.layers)
  const deleteLayer = usePaintStore((s: PaintState) => s.deleteLayer)

  return (
    <aside className="w-64 border-l border-slate-200 bg-white p-3 overflow-auto">
      <div className="font-semibold mb-3">Layers</div>
      {layers.length === 0 && (
        <div className="text-sm text-slate-500">No layers yet. Use a tool and click the canvas.</div>
      )}
      <ul className="space-y-2">
        {[...layers].reverse().map((layer) => (
          <li key={layer.id} className="flex items-center justify-between gap-2 rounded border p-2">
            <div className="text-sm">
              {layer.type === 'shape' ? (
                <>
                  <div className="font-medium">Shape: {layer.shape}</div>
                  <div className="text-xs text-slate-500">color {layer.color.toUpperCase()}</div>
                </>
              ) : (
                <>
                  <div className="font-medium">Background Fill</div>
                  <div className="text-xs text-slate-500">{layer.color.toUpperCase()}</div>
                </>
              )}
            </div>
            <button
              className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              onClick={() => deleteLayer(layer.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
