import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;

  const style = {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    color: 'white',
    margin: "10px 0",
    background: "#3b3939"
  };

  return <div style={style}>{id}</div>;
}

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });



  return (
    <div ref={setNodeRef} className="nb-container" {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  );
}
