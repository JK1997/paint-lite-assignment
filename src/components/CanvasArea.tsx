import { useEffect, useRef } from 'react'
import { usePaintStore } from '../store/usePaintStore'
import type { PaintState } from '../store/usePaintStore'
import type { FillLayer, ShapeLayer } from '../types'

function drawLayers(ctx: CanvasRenderingContext2D, layers: (FillLayer | ShapeLayer)[], width: number, height: number) {
  ctx.clearRect(0, 0, width, height)
  for (const layer of layers) {
    if (layer.type === 'fill') {
      ctx.save()
      ctx.fillStyle = layer.color
      ctx.fillRect(0, 0, width, height)
      ctx.restore()
    } else {
      ctx.save()
      ctx.fillStyle = layer.color
      if (layer.shape === 'rect') {
        const w = layer.size
        const h = Math.round(layer.size * 0.7)
        ctx.fillRect(layer.x - w / 2, layer.y - h / 2, w, h)
      } else if (layer.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(layer.x, layer.y, layer.size / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }
  }
}

export default function CanvasArea() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const layers = usePaintStore((s: PaintState) => s.layers)
  const tool = usePaintStore((s: PaintState) => s.tool)
  const addShapeAt = usePaintStore((s: PaintState) => s.addShapeAt)
  const addFill = usePaintStore((s: PaintState) => s.addFill)
  const setCanvasSize = usePaintStore((s: PaintState) => s.setCanvasSize)
  const { width, height } = usePaintStore((s: PaintState) => s.canvasSize)

  // keep canvas synced with device pixel ratio for sharpness
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    drawLayers(ctx, layers, width, height)
  }, [layers, width, height])

  // resize observer to capture parent size if needed (for now fixed initial)
  useEffect(() => {
    setCanvasSize(width, height)
  }, [setCanvasSize, width, height])

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (tool === 'shape') {
      addShapeAt(x, y)
    } else if (tool === 'fill') {
      addFill()
    }
  }

  return (
    <div className="relative flex-1 flex items-center justify-center bg-slate-100">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="bg-white rounded shadow border border-slate-200"
          width={width}
          height={height}
          onClick={onClick}
        />
      </div>
    </div>
  )
}
