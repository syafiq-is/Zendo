"use client";

import { ReactNode } from "react";
import Image from "next/image";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar 1 */}
        <div className="flex flex-col items-center bg-[var(--container2)] p-4 space-y-4 w-16">
          <button className="w-10 h-10 rounded-full bg-[var(--text-brand)] text-white flex items-center justify-center hover:opacity-80 transition">
            <span className="material-icons text-white text-xl">dashboard</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-[var(--text-brand)] text-white flex items-center justify-center hover:opacity-80 transition">
            <span className="material-icons text-white text-xl">email</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-[var(--text-brand)] text-white flex items-center justify-center hover:opacity-80 transition">
            <span className="material-icons text-white text-xl">add</span>
          </button>
        </div>

        {/* Sidebar 2 */}
        <div className="w-[220px] flex flex-col bg-[var(--container)]">
          {/* Top Bar */}
          <div className="w-full h-[70px] flex items-center justify-between bg-white shadow-md px-6 py-5">
            <div className="text-xl font-bold">My Workspace</div>
          </div>

          <div className="w-full h-full flex flex-col  p-4 space-y-2">
            <button className="flex items-center space-x-1 px-3 py-2 m-0">
              <span className="material-icons text-xl">
                keyboard_arrow_down
              </span>
              <span className="font-semibold text-sm">This Workspace</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-300 transition">
              <span className="material-icons text-xl">home</span>
              <span>Home</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="h-[70px] flex items-center justify-between bg-white shadow px-6 py-3 border-b">
            <div className="text-xl font-bold">Task Board</div>
            <Image
              src="/profile-pic.png"
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
