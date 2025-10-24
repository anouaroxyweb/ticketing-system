import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const COLORS = ["#10B981", "#FBBF24", "#3B82F6", "#9CA3AF"];

  useEffect(() => {
    api.get("/tickets").then((r) => setTickets(r.data));
  }, []);

  const data = ["open", "in_progress", "resolved", "closed"].map((s) => ({
    name: s,
    value: tickets.filter((t) => t.status === s).length,
  }));

  const total = tickets.length;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          📊 Admin Dashboard
        </h2>

        {/* KPIs Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {data.map((d, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm"
            >
              <p className="text-sm text-gray-600 capitalize">{d.name}</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                {d.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center justify-center">
          <PieChart width={400} height={300}>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <p className="mt-4 text-gray-500 text-sm">
            Total Tickets: <span className="font-semibold">{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
