import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WorkspaceProvider } from "./context/WorkspaceContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you want
});

export const metadata: Metadata = {
  title: "Zendo",
  description: "Task Management with Gamification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <WorkspaceProvider>{children}</WorkspaceProvider>
        <ToastContainer
          position="bottom-right"
          closeOnClick={true}
          autoClose={3000}
        />
        ;
      </body>
    </html>
  );
}
