import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth";

export default function Landing() {
  const nav = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) nav("/dashboard"); // ✅ redirect تلقائي للمستخدم المسجل
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ✅ Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            🎫 Ticketing
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {/* Always show Dashboard button */}
            <button
              onClick={() => nav("/dashboard")}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Dashboard
            </button>

            {/* Auth Buttons */}
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => nav("/dashboard")}
                className="text-green-600 font-semibold hover:underline"
              >
                You’re Logged In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* ✅ Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-4">
          Simplify Your Ticket Management
        </h1>
        <p className="text-gray-600 max-w-md mb-8">
          Manage and resolve your support tickets efficiently.  
          Built for users, support staff, and admins.
        </p>

        <div className="flex gap-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => nav("/dashboard")}
              className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-gray-100 text-gray-600 py-4 text-center mt-auto border-t">
        <p>
          © {new Date().getFullYear()} Ticketing System — Built with 💙 by{" "}
          <span className="font-semibold text-blue-600">Anouar Elyoussfi</span>
        </p>
        <p className="text-sm mt-1">
          <Link
            to="/login"
            className="hover:underline text-blue-600 font-medium"
          >
            Admin Login
          </Link>{" "}
          |{" "}
          <a
            href="https://github.com/anouaroxyweb"
            target="_blank"
            className="hover:underline text-blue-600"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
