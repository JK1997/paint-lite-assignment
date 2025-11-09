export type ToolType = 'none' | 'shape' | 'fill' | 'brush'

export type ShapeType = 'rect' | 'circle'

export type ShapeLayer = {
  id: string
  type: 'shape'
  shape: ShapeType
  x: number
  y: number
  size: number // rect: width/height base, circle: radius
  color: string
}

export type FillLayer = {
  id: string
  type: 'fill'
  color: string
}

export type BrushLayer = {
  id: string
  type: 'brush'
  points: { x: number; y: number }[]
  color: string
  size: number
}

export type Layer = ShapeLayer | FillLayer | BrushLayer

