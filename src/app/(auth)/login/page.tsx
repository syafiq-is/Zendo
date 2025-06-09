export default function LoginPage() {
  return (
    <div className="bg-[#103391]">
      <div className="flex items-center justify-center min-h-screen bg-[url('/auth_bg.svg')] bg-cover bg-center px-4">
        {/* CARD */}
        <div className="bg-white rounded-md shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
          <p className="text-gray-600 mb-6 text-center">
            Login to your account
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                EMAIL *
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                PASSWORD *
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                required
              />
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
