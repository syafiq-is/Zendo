import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { useWorkspace } from "@/app/context/WorkspaceContext";
import { AuthUserData } from "@/lib/JWT";
import { IWorkspace } from "@/models/Workspace";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [authUserData, setAuthUserData] = useState<AuthUserData>();
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { activeWorkspace, setActiveWorkspace } = useWorkspace();

  useEffect(() => {
    fetch("/api/workspace")
      .then((res) => res.json())
      .then((data) => {
        const { workspaces, authUserData } = data;
        setWorkspaces(workspaces);
        if (workspaces.length > 0) {
          setActiveWorkspace(workspaces[0]); // Default to first workspace
        }
        setAuthUserData(authUserData);
      })
      .catch(console.error);
  }, [setActiveWorkspace]);

  return (
    <div className="flex flex-col h-screen">
      {/* Main Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar 1 */}
        <div className="flex flex-col items-center bg-color-bg-darker p-4 space-y-4 w-16">
          {workspaces?.map((workspace) => (
            <a
              key={workspace._id.toString()}
              onClick={() => setActiveWorkspace(workspace)}
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition ${
                activeWorkspace?._id === workspace._id
                  ? "bg-color-brand text-white"
                  : "bg-gray-300 text-black"
              }`}
              title={workspace.name}
            >
              <span className="material-icons text-xl">add</span>
            </a>
          ))}
        </div>

        {/* Sidebar 2 */}
        <div className="w-[220px] flex flex-col bg-color-bg-dark">
          {/* Top Bar */}
          <div className="w-full h-[70px] flex items-center justify-between bg-white shadow-md px-6 py-5">
            <div className="text-xl font-bold">
              {activeWorkspace?.name || "My Workspace"}
            </div>
          </div>

          <div className="w-full h-full flex flex-col  p-4 space-y-2">
            <a href="" className="flex items-center space-x-1 px-3 py-2 m-0">
              <span className="material-icons text-xl">
                keyboard_arrow_down
              </span>
              <span className="font-semibold text-sm">This Workspace</span>
            </a>
            <a
              href=""
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-300 transition"
            >
              <span className="material-icons text-xl">assignment</span>
              <span>Task Board</span>
            </a>
            <a
              href="/settings/workspace
              "
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-300 transition"
            >
              <span className="material-icons text-xl">settings</span>
              <span>Workspace Settings</span>
            </a>
            <a href="" className="flex items-center space-x-1 px-3 py-2 m-0">
              <span className="material-icons text-xl">
                keyboard_arrow_down
              </span>
              <span className="font-semibold text-sm">Global</span>
            </a>
            <a
              href=""
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-300 transition"
            >
              <span className="material-icons text-xl">bar_chart</span>
              <span>Leaderboards</span>
            </a>
            <a
              href=""
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-300 transition"
            >
              <span className="material-icons text-xl">emoji_events</span>
              <span>Achievement</span>
            </a>
            <a
              href="/settings/user"
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-300 transition"
            >
              <span className="material-icons text-xl">settings</span>
              <span>Settings</span>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="h-[70px] flex items-center justify-between bg-white shadow px-6 py-3 border-b">
            <div className="text-xl font-bold">
              {activeWorkspace?.name || "Task Board"}
            </div>
            <Image
              src={`/api/profile/image/${authUserData?.profileImg}`}
              width={25}
              height={25}
              alt="User 2"
              className="w-10 h-10 rounded-full"
            />
          </div>

          <div className="flex h-full">
            <main className="flex-1 bg-white overflow-auto p-6">
              {children}
            </main>

            {/* Sidebar Right */}
            <div className="flex flex-col bg-gray-100 p-4 w-56 space-y-4">
              <div className="font-semibold text-sm m-0 py-2">Owner - 1</div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/profile-pic.png"
                  width={25}
                  height={25}
                  alt="User 1"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-semibold -mb-1">Mizuki Akiyama</span>
                  <span>Hello everyone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
