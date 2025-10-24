import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export default function MyTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const load = () => api.get("/tickets").then(res => setTickets(res.data));
  useEffect(() => { load(); }, []);
  const create = async () => {
    const title = prompt("Title") || "";
    if (!title) return;
    await api.post("/tickets", { title });
    load();
  };
  const edit = async (id:number) => {
    const title = prompt("New title");
    if (!title) return;
    await api.put(`/tickets/${id}`, { title });
    load();
  };
  return (
    <div style={{ padding: 24 }}>
      <h2>My Tickets</h2>
      <button onClick={create}>New Ticket</button>
      <ul>
        {tickets.map(t => (
          <li key={t.id}>
            #{t.id} — {t.title} — {t.status}
            {t.status === "open" && <button onClick={()=>edit(t.id)} style={{ marginLeft: 8 }}>Edit</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
