export interface DraggableProps {
    id: number;
    text?: string;
    src?: string;
    status: KanbanStatus;
    order: number;
}

export interface DropResult {
    name: string;
    status: KanbanStatus;
}

export type KanbanStatus = 'todo' | 'progress' | 'review' | 'done';