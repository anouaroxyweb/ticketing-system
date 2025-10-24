import { useEffect, useMemo, useState } from "react";
import { api } from "../../api/axios";

type Ticket = {
  id: number;
  title: string;
  status: "open" | "in_progress" | "resolved" | "closed";
};

const STATUS_OPTIONS: Ticket["status"][] = [
  "open",
  "in_progress",
  "resolved",
  "closed",
];

function StatusBadge({ status }: { status: Ticket["status"] }) {
  const cls =
    status === "open"
      ? "bg-green-100 text-green-700"
      : status === "in_progress"
      ? "bg-yellow-100 text-yellow-700"
      : status === "resolved"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-200 text-gray-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export default function AllTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  const load = () => api.get("/tickets").then((r) => setTickets(r.data));
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return tickets;
    return tickets.filter(
      (t) =>
        t.title.toLowerCase().includes(filter.toLowerCase()) ||
        String(t.id) === filter
    );
  }, [tickets, filter]);

  const onChangeRowStatus = async (id: number, status: Ticket["status"]) => {
    try {
      setError(null);
      setSavingId(id);
      await api.put(`/tickets/${id}`, { status });
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Failed to update status");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6 gap-3">
          <h2 className="text-2xl font-bold text-gray-800">🎫 All Tickets</h2>
          <input
            className="w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            placeholder="Search by title or #id…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No tickets found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Change status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      #{t.id}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{t.title}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <select
                          defaultValue={t.status}
                          onChange={(e) =>
                            onChangeRowStatus(
                              t.id,
                              e.target.value as Ticket["status"]
                            )
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={savingId === t.id}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {savingId === t.id && (
                          <span className="text-xs text-gray-500">Saving…</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-2 px-1">
              Tip: selecting a status saves immediately (no modal/alert).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
