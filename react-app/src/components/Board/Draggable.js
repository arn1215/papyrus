import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useAutoAnimate } from '@formkit/auto-animate/react'
const Draggable = (props) => {
  const [animationParent] = useAutoAnimate()
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%', backgroundColor: 'black' }}>
      <div ref={setNodeRef} style={{ zIndex: 1, opacity: isOver ? .8 : 1, transition: 'all', transitionDuration: '200ms' }}>
        {props.title}
        <div ref={animationParent}>
          {props.children}
        </div>
      </div>

    </div>

  )
}

export default Draggable