"use client";

import { displayToastMessage, setToastMessage, showToast } from "@/lib/Toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setToastMessage(data.type, data.message);
      router.push("/login");
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
          <h2 className="text-2xl font-semibold mb-2 text-center">Register</h2>
          <p className="text-gray-600 mb-6 text-center">Create a new account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                EMAIL *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="username"
              >
                USERNAME *
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                id="username"
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

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-[var(--text-brand)] border-gray-300 rounded focus:ring-[var(--text-brand)]"
                required
                onChange={handleChange}
              />
              <label htmlFor="terms" className="text-sm">
                I have read and agree to Zendo&apos;s{" "}
                <a
                  href="#"
                  className="text-[var(--text-brand)] hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[var(--text-brand)] hover:underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--text-brand)] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Register
            </button>

            <div className="text-sm">
              <a
                href="/login"
                className="text-[var(--text-brand)] hover:underline"
              >
                Already have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
