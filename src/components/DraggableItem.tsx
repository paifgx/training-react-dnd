import { FC } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { DraggableProps } from '../types';
import { DND_TYPES } from '../constants';

export const DraggableItem: FC<DraggableProps> = (props) => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: props.text ? DND_TYPES.BOX : DND_TYPES.IMAGE,
        item: props,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <>
            <DragPreviewImage connect={preview} src="https://via.placeholder.com/150x75" />
            <div
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.2s, opacity 0.2s',
                    color: 'black',
                }}
            >
                {props.text ? props.text : <img src={props.src} alt="Image" />}
            </div>
        </>
    );
};