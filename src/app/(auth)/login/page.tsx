"use client";

import { setToastMessage, displayToastMessage, showToast } from "@/lib/Toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setToastMessage(data.type, data.message);
      router.push("/dashboard");
    } else {
      showToast(data.type, data.message);
    }
  };

  // Handle Toasts Message
  useEffect(() => {
    displayToastMessage();
  }, []);

  return (
    <div className="bg-[#103391]">
      <div className="flex items-center justify-center min-h-screen bg-[url('/auth_bg.svg')] bg-cover bg-center px-4">
        {/* CARD */}
        <div className="bg-white rounded-md shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
          <p className="text-gray-600 mb-6 text-center">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                EMAIL *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                required
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                PASSWORD *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                required
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-8 inset-y-0 text-gray-600 hover:text-black"
                tabIndex={-1}
              >
                <span className="material-icons">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            <div className="text-sm mb-4">
              <a href="#" className="text-[var(--text-brand)] hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--text-brand)] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Login
            </button>

            <div className="text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-[var(--text-brand)] hover:underline"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
