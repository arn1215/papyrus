import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { useAutoAnimate } from '@formkit/auto-animate/react'
const Board = (props) => {
  const [animationParent] = useAutoAnimate()
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });


  return (
    <div ref={setNodeRef} style={{ width: '100%', zIndex: 1, opacity: isOver ? .8 : 1, transition: 'all', transitionDuration: '200ms' }}>
      {props.title}
      <div ref={animationParent}>
        {props.children}

      </div>
    </div>

  )
}

export default Board