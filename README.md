# Paint‑lite (React + TypeScript + Tailwind)

A minimal picture editing web app built for the assignment. It uses React + TypeScript with Vite and Tailwind CSS for styling.

## Features

- Toolbar with tools: Shape and Background Fill (and None)
- Context‑aware control panel (top‑left on canvas)
  - Shape: choose color, shape (rectangle/circle), and size
  - Fill: choose background color
- Canvas drawing surface using the `<canvas>` element
- Layer panel (right) listing each action as a layer; delete to remove a layer
- Extensible state model via Zustand store

## Getting started

Prerequisites: Node 18+.

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## How it works

- Each user action creates a layer stored in a global Zustand store.
- The canvas re-renders from the ordered list of layers on every change.
- Control panel shows the options for the selected tool only.
- Deleting a layer removes the corresponding drawing from the canvas on the next render.

## Extensibility notes

- New tools can be added by extending `ToolType` and adding a handler in `CanvasBoard` and the control panel.
- For more complex editing, consider converting to command pattern with undo/redo stacks.

## Repository & PR

1. Commit your changes:
   ```bash
   git add -A
   git commit -m "feat: implement paint-lite with Tailwind, tools, and layers"
   ```
2. Push a branch:
   ```bash
   git checkout -b feature/paint-lite
   git push -u origin feature/paint-lite
   ```
3. Open a Pull Request on GitHub from `feature/paint-lite` to `main` and include a short demo in the description.

