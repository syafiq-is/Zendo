"use client";

import MainLayout from "@/components/MainLayout";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialData = {
  todo: [
    { id: "task-1", content: "Do the dishes" },
    { id: "task-2", content: "Clean the room" },
  ],
  inProgress: [{ id: "task-3", content: "Work on project" }],
  done: [{ id: "task-4", content: "Buy groceries" }],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a list
    if (!destination) return;

    const sourceCol = source.droppableId as keyof typeof columns;
    const destCol = destination.droppableId as keyof typeof columns;

    // Moving within same column
    if (sourceCol === destCol) {
      const newCol = Array.from(columns[sourceCol]);
      const [movedItem] = newCol.splice(source.index, 1);
      newCol.splice(destination.index, 0, movedItem);

      setColumns((prev) => ({ ...prev, [sourceCol]: newCol }));
    } else {
      // Moving between columns
      const sourceItems = Array.from(columns[sourceCol]);
      const destItems = Array.from(columns[destCol]);

      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setColumns((prev) => ({
        ...prev,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      }));
    }
  };

  // Handle Toasts Message
  useEffect(() => {
    const raw = sessionStorage.getItem("toastMessage");
    if (raw) {
      const { type, text } = JSON.parse(raw);

      if (type === "success") toast.success(text);
      else if (type === "error") toast.error(text);
      else toast(text); // fallback for neutral message

      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  return (
    <MainLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 p-6">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-col bg-gray-100 rounded p-4 w-64 ${
                    snapshot.isDraggingOver ? "bg-blue-100" : ""
                  }`}
                >
                  <h2 className="font-bold mb-4 capitalize">
                    {columnId.replace(/([A-Z])/g, " $1")}
                  </h2>
                  {tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-2 p-3 bg-white rounded shadow cursor-pointer ${
                            snapshot.isDragging ? "bg-blue-200" : ""
                          }`}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </MainLayout>
  );
}
