import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import BoardItem from './BoardItem';
import Board from './Board';
import BoardList from './BoardList';

function BoardPage() {
  const [parent, setParent] = useState(null);
  const Draggable = (item) => (
    <BoardItem id="draggable" >
      <div style={{ cursor: 'pointer' }} className="nb-container">
        Go ahead, drag me.\\\\\\\\\\
      </div>
    </BoardItem>
  );


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", width: '100%', height: '100%', justifyContent: 'space-around' }}>
        <Board id="todo" title="todo">
          {parent === "todo" ? <Draggable /> : null}
          <BoardList id="todoList" title={"To Do"} >
            {!parent ? <Draggable /> : null}
            {parent === "todoList" ? <Draggable /> : null}
          </BoardList>
        </Board>
        <Board id="prog" title="prog">
          {parent === "prog" ? <Draggable /> : null}
          <BoardList id="progList" title={"In Progress"} >
            {parent === "progList" ? <Draggable /> : null}
          </BoardList>
        </Board>
        <Board id="done" title="done">
          {parent === "done" ? <Draggable /> : null}
          <BoardList id="doneList" title={"Done"} >
            {parent === "doneList" ? <Draggable /> : null}
          </BoardList>
        </Board>
      </div>


    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
}

export default BoardPage