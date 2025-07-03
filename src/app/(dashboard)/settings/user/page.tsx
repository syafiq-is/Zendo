"use client";

import { AuthUserData } from "@/lib/JWT";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [authUserData, setAuthUserData] = useState<AuthUserData>();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (authUserData?.id) {
      formData.append("userId", authUserData.id);
    } else {
      console.warn("User ID not available when uploading profile image.");
      return;
    }

    console.log(authUserData);

    try {
      const res = await fetch("/api/profile/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      console.log(data?.file.filename);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        console.log(`❌ Upload failed: ${err.message}`);
      } else {
        console.error("❌ Unknown error during upload:", err);
      }
    } finally {
      setUploading(false);
    }
  };

  // Get User Data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/settings/user");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error");

        setAuthUserData(data?.authUserData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
          console.log(`❌ Error: ${err.message}`);
        } else {
          console.error("❌ Unknown error:", err);
        }
      }
    };

    fetchUserData();
  }, []);

  // Save new username
  const saveUsername = async () => {
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: tempUsername }),
    });
    if (res.ok) {
      // Refetch fresh user data
      const refreshed = await fetch("/api/settings/user");
      const json = await refreshed.json();
      setAuthUserData(json.authUserData);
      setIsEditingUsername(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex pt-10 px-10 justify-end bg-color-bg-dark h-screen w-md">
        <div className="w-60">
          <h2 className="py-2 px-4 font-semibold">User Settings</h2>
          <a href="" className="block py-2 px-4 bg-color-bg-darker rounded-lg">
            My Account
          </a>
        </div>
      </div>
      <div className="pt-10 px-10 mb-5">
        <h2 className="font-semibold text-2xl mb-5">My Account</h2>
        <div className="bg-color-bg-dark rounded-xl p-4 w-lg mb-5">
          <div className="flex justify-between items-center mb-5">
            <Image
              src={`/api/profile/image/${authUserData?.profileImg}`}
              width={150}
              height={150}
              alt="Profile pic"
              className="w-32 h-32 rounded-full object-cover bg-black"
            />

            <button
              className="py-2 px-4 bg-color-brand text-color-bg h-fit rounded-lg"
              onClick={() => setShowForm(!showForm)}
            >
              Edit Picture
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleUpload}
              className="mb-4 flex items-center bg-color-bg-darker"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="mb-2 w-full h-full px-4"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-color-brand text-color-bg h-fit rounded-lg"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form>
          )}

          {/* USERNAME FIELD */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Username</h2>
              {isEditingUsername ? (
                <input
                  className="block py-1 px-2 rounded-md text-black"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                />
              ) : (
                <span className="block py-2">{authUserData?.username}</span>
              )}
            </div>
            {isEditingUsername ? (
              <div className="flex gap-2">
                <button
                  className="py-1 px-2 bg-color-brand text-color-bg rounded"
                  onClick={saveUsername}
                >
                  Save
                </button>
                <button
                  className="py-1 px-2 bg-gray-400 text-white rounded"
                  onClick={() => {
                    setIsEditingUsername(false);
                    setTempUsername(authUserData?.username ?? "");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="py-2 px-4 bg-color-bg-darker h-fit rounded-lg"
                onClick={() => {
                  setTempUsername(authUserData?.username ?? "");
                  setIsEditingUsername(true);
                }}
              >
                Edit
              </button>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Email</h2>
              <span className="block py-2">{authUserData?.email}</span>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="font-semibold mb-2">Password</h2>
          <button className="py-2 px-4 bg-color-brand text-color-bg h-fit rounded-lg">
            Change Password
          </button>
        </div>
        <div className="mb-5">
          <h2 className="font-semibold mb-2">Account</h2>
          <button className="py-2 px-4 bg-color-danger text-color-bg h-fit rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
