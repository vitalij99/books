'use client';

import {  useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const STORAGE_KEY_DRAGG = 'draggableBoxPosition';

const DraggableBox = ({ children }: { children: React.ReactNode }) => {

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedPosition = localStorage.getItem(STORAGE_KEY_DRAGG);
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const handleDrag = (_e: any, data: any) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem(STORAGE_KEY_DRAGG, JSON.stringify(newPosition));
  };

  return (
    <Draggable  position={position} onDrag={handleDrag}>
      <div  className="cursor-move">
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableBox;
