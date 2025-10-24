import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => api.get("/users").then((r) => setUsers(r.data));
  useEffect(() => {
    load();
  }, []);

  const updateRole = async (id: number, role: string) => {
    try {
      setSavingId(id);
      await api.put(`/users/${id}`, { role });
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to update role");
    } finally {
      setSavingId(null);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          👥 Manage Users
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      {u.username}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{u.email}</td>
                    <td className="py-3 px-4">
                      <select
                        defaultValue={u.role}
                        onChange={(e) => updateRole(u.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={savingId === u.id}
                      >
                        <option value="user">User</option>
                        <option value="support">Support</option>
                        <option value="admin">Admin</option>
                      </select>
                      {savingId === u.id && (
                        <span className="ml-2 text-xs text-gray-500">
                          Updating…
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => remove(u.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
