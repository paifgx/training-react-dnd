import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { DraggableItem } from './DraggableItem';
import { DraggableProps, KanbanStatus } from '../types';
import { DND_TYPES } from '../constants';

interface KanbanColumnProps {
    title: string;
    status: KanbanStatus;
    items: DraggableProps[];
    onDrop: (item: DraggableProps, status: KanbanStatus) => void;
    onReorder: (itemId: number, newOrder: number, status: KanbanStatus) => void;
}

export const KanbanColumn: FC<KanbanColumnProps> = ({
    title,
    status,
    items,
    onDrop,
    onReorder
}) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: [DND_TYPES.BOX, DND_TYPES.IMAGE],
        drop: (item: DraggableProps) => {
            if (item.status !== status) {
                onDrop(item, status);
            }
            return { name: title, status };
        },
        hover: (item: DraggableProps, monitor) => {
            if (!monitor.isOver({ shallow: true })) return;

            if (item.status === status) {
                const dragIndex = items.findIndex(i => i.id === item.id);
                const clientOffset = monitor.getClientOffset();

                if (!clientOffset) return;

                const dropTargetElement = document.elementFromPoint(clientOffset.x, clientOffset.y);
                const itemElement = dropTargetElement?.closest('[data-item-id]');

                if (!itemElement) return;

                const targetId = Number(itemElement.getAttribute('data-item-id'));
                const hoverIndex = items.findIndex(i => i.id === targetId);

                if (dragIndex === hoverIndex || hoverIndex === -1) return;

                const hoverBoundingRect = itemElement.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

                onReorder(item.id, hoverIndex, status);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [items, status, onReorder]);

    const getBackgroundColor = () => {
        if (isOver) return 'rgba(255, 165, 0, 0.2)';
        if (canDrop) return 'rgba(0, 0, 255, 0.1)';
        return 'rgba(255, 255, 255, 0.1)';
    };

    return (
        <div
            ref={drop}
            style={{
                width: '300px',
                minHeight: '400px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: getBackgroundColor(),
                padding: '1rem',
                transition: 'background-color 0.3s',
            }}
        >
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>{title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item) => (
                    <div key={item.id} data-item-id={item.id}>
                        <DraggableItem {...item} />
                    </div>
                ))}
            </div>
        </div>
    );
};