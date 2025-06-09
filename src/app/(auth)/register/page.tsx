export default function RegisterPage() {
  return (
    <div className="bg-[#103391]">
      <div className="flex items-center justify-center min-h-screen bg-[url('/auth_bg.svg')] bg-cover bg-center px-4">
        {/* CARD */}
        <div className="bg-white rounded-md shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-2 text-center">Register</h2>
          <p className="text-gray-600 mb-6 text-center">Create a new account</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                EMAIL *
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                required
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
                id="username"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                DATE OF BIRTH *
              </label>
              <div className="flex space-x-2">
                <select
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                  required
                >
                  <option value="">Month</option>
                  {/* Add month options */}
                </select>
                <select
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                  required
                >
                  <option value="">Date</option>
                  {/* Add date options */}
                </select>
                <select
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--text-brand)]"
                  required
                >
                  <option value="">Year</option>
                  {/* Add year options */}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-[var(--text-brand)] border-gray-300 rounded focus:ring-[var(--text-brand)]"
                required
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
