import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { createTicket, deleteTicket, getTicket, listTickets, updateTicket } from "../controllers/ticket.controller.js";

const r = Router();
r.use(auth);
r.post("/", requireRole("user","support","admin"), createTicket);
r.get("/", requireRole("user","support","admin"), listTickets);
r.get("/:id", requireRole("user","support","admin"), getTicket);
r.put("/:id", requireRole("user","support","admin"), updateTicket);
r.delete("/:id", requireRole("admin"), deleteTicket);
export default r;
