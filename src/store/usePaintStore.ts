import { create, type StoreApi } from 'zustand'
import type { Layer, ToolType, ShapeType } from '../types'

export type PaintState = {
  tool: ToolType
  shapeOptions: { shape: ShapeType; color: string; size: number }
  fillOptions: { color: string }
  canvasSize: { width: number; height: number }
  layers: Layer[]
  // actions
  setTool: (tool: ToolType) => void
  setShape: (shape: ShapeType) => void
  setShapeColor: (color: string) => void
  setShapeSize: (size: number) => void
  setFillColor: (color: string) => void
  setCanvasSize: (width: number, height: number) => void
  addShapeAt: (x: number, y: number) => void
  addFill: () => void
  deleteLayer: (id: string) => void
  clear: () => void
}

let idCounter = 0
const nextId = () => `${Date.now().toString(36)}-${idCounter++}`

export const usePaintStore = create<PaintState>((set: StoreApi<PaintState>['setState']) => ({
  tool: 'none',
  shapeOptions: { shape: 'rect', color: '#2563eb', size: 100 },
  fillOptions: { color: '#f1f5f9' },
  canvasSize: { width: 800, height: 500 },
  layers: [],
  setTool: (tool: ToolType) => set({ tool }),
  setShape: (shape: ShapeType) => set((s: PaintState) => ({ shapeOptions: { ...s.shapeOptions, shape } })),
  setShapeColor: (color: string) => set((s: PaintState) => ({ shapeOptions: { ...s.shapeOptions, color } })),
  setShapeSize: (size: number) => set((s: PaintState) => ({ shapeOptions: { ...s.shapeOptions, size } })),
  setFillColor: (color: string) => set(() => ({ fillOptions: { color } })),
  setCanvasSize: (width: number, height: number) => set({ canvasSize: { width, height } }),
  addShapeAt: (x: number, y: number) =>
    set((s: PaintState) => ({
      layers: [
        ...s.layers,
        {
          id: nextId(),
          type: 'shape',
          shape: s.shapeOptions.shape,
          x,
          y,
          size: s.shapeOptions.size,
          color: s.shapeOptions.color,
        },
      ],
    })),
  addFill: () =>
    set((s: PaintState) => ({
      layers: [
        ...s.layers,
        { id: nextId(), type: 'fill', color: s.fillOptions.color },
      ],
    })),
  deleteLayer: (id) => set((s) => ({ layers: s.layers.filter((l) => l.id !== id) })),
  clear: () => set({ layers: [] }),
}))

export const COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#2563eb', '#a855f7', '#111827']
