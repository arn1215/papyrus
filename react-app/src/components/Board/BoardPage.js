import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

function BoardPage() {
  const [items] = useState([1, 2, 3]);

  return (
    <DndContext>
      <SortableContext items={items}>

      </SortableContext>
    </DndContext>
  );
}

export default BoardPage