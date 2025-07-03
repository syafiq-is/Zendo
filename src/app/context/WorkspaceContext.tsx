// app/context/WorkspaceContext.tsx
"use client";

import { IWorkspace } from "@/models/Workspace";
import { createContext, useContext, useEffect, useState } from "react";

export type WorkspaceContextType = {
  workspaces: IWorkspace[];
  activeWorkspace?: IWorkspace;
  setActiveWorkspace: (workspace: IWorkspace) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<IWorkspace>();

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
      value={{
        workspaces,
        activeWorkspace,
        setActiveWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
