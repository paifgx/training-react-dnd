import { KanbanStatus } from "./types";

export const DND_TYPES = {
    BOX: 'Box',
    IMAGE: 'Image'
} as const;

export const KANBAN_COLUMNS: { title: string; status: KanbanStatus }[] = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'progress' },
    { title: 'Review', status: 'review' },
    { title: 'Done', status: 'done' },
];