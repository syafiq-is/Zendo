"use client";

import { useState, useEffect } from "react";

interface Todo {
  _id: string;
  title: string;
}

interface TaskBoard {
  _id: string;
  title: string;
  todos: Todo[];
}

interface Props {
  taskboards: TaskBoard[];
  onDropItem?: (itemId: string, toBoardId: string) => void;
}

export default function DragDropBoard({ taskboards, onDropItem }: Props) {
  const [boards, setBoards] = useState<TaskBoard[]>([]);
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);
  const [originBoardId, setOriginBoardId] = useState<string | null>(null);

  useEffect(() => {
    setBoards(taskboards);
  }, [taskboards]);

  const handleDrop = (toBoardId: string) => {
    if (!draggedTodo || !originBoardId) return;

    setBoards((prev) =>
      prev.map((board) => {
        // Remove todo from original board
        if (board._id === originBoardId) {
          return {
            ...board,
            todos: board.todos.filter((todo) => todo._id !== draggedTodo._id),
          };
        }

        // Add todo to target board
        if (board._id === toBoardId) {
          return {
            ...board,
            todos: [...board.todos, draggedTodo],
          };
        }

        return board;
      })
    );

    if (onDropItem) {
      onDropItem(draggedTodo._id, toBoardId);
    }

    setDraggedTodo(null);
    setOriginBoardId(null);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {boards.map((board) => (
        <div
          key={board._id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(board._id)}
          className="w-64 bg-gray-100 rounded-lg shadow p-4 flex-shrink-0"
        >
          <h2 className="font-bold mb-4">{board.title}</h2>
          <div className="space-y-2 min-h-[50px]">
            {board.todos.map((todo) => (
              <div
                key={todo._id}
                draggable
                onDragStart={() => {
                  setDraggedTodo(todo);
                  setOriginBoardId(board._id);
                }}
                className="p-2 bg-white rounded shadow cursor-move"
              >
                {todo.title}
              </div>
            ))}
          </div>
          <button className="">+ Add Todo</button>
        </div>
      ))}
    </div>
  );
}
