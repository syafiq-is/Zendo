// app/context/WorkspaceContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WorkspaceContext = createContext<any>(null);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<any>(null);

  useEffect(() => {
    fetch("/api/workspace")
      .then((res) => res.json())
      .then((data) => {
        setWorkspaces(data);
        if (data.length > 0) setActiveWorkspace(data[0]);
      });
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, activeWorkspace, setActiveWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
