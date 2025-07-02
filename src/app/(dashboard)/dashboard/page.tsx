"use client";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import DragDropBoard from "@/components/DragDropBoard";
import MainLayout from "@/components/MainLayout";
import { displayToastMessage } from "@/lib/Toast";
import { useEffect, useState } from "react";

export default function KanbanBoard() {
  const [taskboards, setTaskboards] = useState<any[]>([]);
  const { activeWorkspace } = useWorkspace();

  // Handle Toasts Message
  useEffect(() => {
    setTaskboards(activeWorkspace?.taskboards);

    displayToastMessage();
  }, [activeWorkspace]);

  return (
    <MainLayout>
      {/* User Draggable Column */}
      {Array.isArray(taskboards) && taskboards.length > 0 && (
        <DragDropBoard
          taskboards={taskboards}
          onDropItem={(itemId, boardId) => {
            const fromBoard = taskboards.find((b) =>
              b.todos.some((todo) => todo._id === itemId)
            )?._id;

            if (!fromBoard || fromBoard === boardId) return;

            fetch("/api/taskboard/move-todo", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                todoId: itemId,
                fromBoardId: fromBoard,
                toBoardId: boardId,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Updated:", data);
              })
              .catch(console.error);
          }}
        />
      )}
    </MainLayout>
  );
}
