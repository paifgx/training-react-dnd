import { createRoot } from 'react-dom/client'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { KanbanBoard } from './components/KanbanBoard';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <DndProvider backend={HTML5Backend}>
    <KanbanBoard />
  </DndProvider>,
)
