import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          👋 Welcome {user?.username || "Guest"}
        </h2>
        <p className="text-gray-500 mt-1">Role: {user?.role}</p>

        <nav className="flex flex-col gap-3 mt-6">
          {user?.role === "user" && (
            <Link
              to="/my-tickets"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              🎫 My Tickets
            </Link>
          )}

          {(user?.role === "support" || user?.role === "admin") && (
            <Link
              to="/tickets"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              📋 All Tickets
            </Link>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/admin/users"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
              >
                👥 Manage Users
              </Link>
              <Link
                to="/admin"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                📊 Admin KPIs
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
