import { FC, useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { DraggableProps, KanbanStatus } from '../types';
import { KANBAN_COLUMNS } from '../constants';

export const KanbanBoard: FC = () => {
    const [items, setItems] = useState<DraggableProps[]>([
        { id: 1, text: 'Task 1', status: 'todo', order: 0 },
        { id: 2, text: 'Task 2', status: 'todo', order: 1 },
        { id: 3, text: 'Task 3', status: 'progress', order: 0 },
        { id: 4, text: 'Task 4', status: 'review', order: 0 },
        { id: 5, src: 'https://via.placeholder.com/150', status: 'done', order: 0 },
    ]);

    const handleDrop = (item: DraggableProps, newStatus: KanbanStatus) => {
        setItems(prevItems => {
            const maxOrder = Math.max(
                ...prevItems
                    .filter(i => i.status === newStatus)
                    .map(i => i.order),
                -1
            );

            return prevItems.map(prevItem =>
                prevItem.id === item.id
                    ? { ...prevItem, status: newStatus, order: maxOrder + 1 }
                    : prevItem
            );
        });
    };

    const handleReorder = (itemId: number, newOrder: number, status: KanbanStatus) => {
        setItems(prevItems => {
            const itemsInColumn = prevItems.filter(item => item.status === status);

            const remainingItems = itemsInColumn.filter(item => item.id !== itemId);
            const targetItem = prevItems.find(item => item.id === itemId);

            if (!targetItem) return prevItems;

            remainingItems.splice(newOrder, 0, targetItem);

            const updatedItems = prevItems.map(item => {
                if (item.status !== status) return item;

                const newIndex = remainingItems.findIndex(i => i.id === item.id);
                return { ...item, order: newIndex };
            });

            return updatedItems;
        });
    };

    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            overflowX: 'auto',
            minHeight: '500px'
        }}>
            {KANBAN_COLUMNS.map(({ title, status }) => (
                <KanbanColumn
                    key={status}
                    title={title}
                    status={status}
                    items={items.filter(item => item.status === status)
                        .sort((a, b) => a.order - b.order)}
                    onDrop={handleDrop}
                    onReorder={handleReorder}
                />
            ))}
        </div>
    );
};