import React, { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import BoardItem from './BoardItem';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import BoardList from './BoardList';

function BoardPage() {
  const [parent, setParent] = useState(null);
  const [current, setCurrent] = useState("")
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
        {!parent ? draggable : null}
        <BoardList id="todo" title="todo">
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
    setCurrent(parent)
  }
}

export default BoardPage