import React from 'react'
import { useDroppable } from '@dnd-kit/core'
const BoardList = (props) => {

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <div ref={setNodeRef} className='notebook-bar' style={{ zIndex: 1 }}>
        {props.title}
        {props.children}
      </div>
    </div>

  )
}

export default BoardList