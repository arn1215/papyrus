import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import BoardItem from './BoardItem';
import BoardList from './BoardList';

function BoardPage() {
  const [parent, setParent] = useState(null);
  const [animationParent] = useAutoAnimate()
  const draggable = (
    <BoardItem id="draggable" >
      <div className='nb-container' style={{ cursor: 'pointer' }}>
        Go ahead, drag me.\\\\\\\\\\
      </div>
    </BoardItem>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", width: '100%', height: '100%', justifyContent: 'space-around' }} ref={animationParent}>
        <BoardList id="todo" title="todo">
          {!parent ? draggable : null}
          {parent === "todo" ? draggable : null}
        </BoardList>
        <BoardList id="progress" title="in progress">
          {parent === "progress" ? draggable : null}
        </BoardList>
        <BoardList id="done" title="done">
          {parent === "done" ? draggable : null}
        </BoardList>
      </div>


    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
}

export default BoardPage