import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { DropResult } from '../types';
import { DND_TYPES } from '../constants';

export const DropZone: FC = () => {
    // Drop-Hook-Konfiguration mit Statusverfolgung
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: [DND_TYPES.BOX, DND_TYPES.IMAGE],
        drop: (item) => {
            const dropResult: DropResult = { name: 'DropZone' };
            console.log('Dropped item:', item);
            console.log('Drop result:', dropResult);
            return dropResult;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    // Hintergrundfarbe basierend auf dem Drag-Status
    const getBackgroundColor = () => {
        if (isOver) return 'orange';
        if (canDrop) return 'blue';
        return 'green';
    };

    return (
        <div
            ref={drop}
            style={{
                height: '200px',
                width: '300px',
                border: '2px dashed #ccc',
                backgroundColor: getBackgroundColor(),
                padding: '1rem',
                transition: 'background-color 0.3s',
            }}
        >
            {isOver ? 'Release to drop!' : 'Drop Zone (Accepts Box and Image Types)'}
        </div>
    );
};