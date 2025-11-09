import { useEffect, useRef, useState } from 'react'
import { usePaintStore } from '../store/usePaintStore'
import type { PaintState } from '../store/usePaintStore'
import type { FillLayer, ShapeLayer, BrushLayer } from '../types'

function drawLayers(ctx: CanvasRenderingContext2D, layers: (FillLayer | ShapeLayer | BrushLayer)[], width: number, height: number) {
  ctx.clearRect(0, 0, width, height)
  for (const layer of layers) {
    if (layer.type === 'fill') {
      ctx.save()
      ctx.fillStyle = layer.color
      ctx.fillRect(0, 0, width, height)
      ctx.restore()
    } else if (layer.type === 'shape') {
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
    } else if (layer.type === 'brush') {
      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = layer.color
      ctx.lineWidth = layer.size
      ctx.beginPath()
      for (let i = 0; i < layer.points.length; i++) {
        const p = layer.points[i]
        if (i === 0) {
          ctx.moveTo(p.x, p.y)
        } else {
          ctx.lineTo(p.x, p.y)
        }
      }
      ctx.stroke()
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
  const addBrushPoint = usePaintStore((s: PaintState) => s.addBrushPoint)
  const addBrushStroke = usePaintStore((s: PaintState) => s.addBrushStroke)
  const setCanvasSize = usePaintStore((s: PaintState) => s.setCanvasSize)
  const { width, height } = usePaintStore((s: PaintState) => s.canvasSize)

  const [isDrawing, setIsDrawing] = useState(false)

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

  const getCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    return { x, y }
  }

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'brush') {
      setIsDrawing(true)
      const { x, y } = getCoords(e)
      addBrushPoint(x, y)
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'brush' && isDrawing) {
      const { x, y } = getCoords(e)
      addBrushPoint(x, y)
    }
  }

  const onMouseUp = () => {
    if (tool === 'brush' && isDrawing) {
      setIsDrawing(false)
      addBrushStroke()
    }
  }

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoords(e)
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
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp} // Stop drawing if mouse leaves canvas
        />
      </div>
    </div>
  )
}
