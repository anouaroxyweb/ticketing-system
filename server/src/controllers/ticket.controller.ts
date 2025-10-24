import { prisma } from "../prisma.js";
import { Request, Response } from "express";
import { createTicketSchema, updateTicketSchema } from "../validators/ticket.validators.js";

export const createTicket = async (req: Request, res: Response) => {
  const parsed = createTicketSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user = (req as any).user;
  const ticket = await prisma.ticket.create({
    data: { ...parsed.data, user_id: user.id },
  });
  res.status(201).json(ticket);
};

export const listTickets = async (req: Request, res: Response) => {
  const user = (req as any).user as { id:number; role:string };
  const tickets = await prisma.ticket.findMany({
    where: user.role === "user" ? { user_id: user.id } : {},
    orderBy: { created_at: "desc" },
  });
  res.json(tickets);
};

export const getTicket = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = (req as any).user as { id:number; role:string };
  const t = await prisma.ticket.findUnique({ where: { id } });
  if (!t) return res.status(404).json({ message: "Not found" });
  if (user.role === "user" && t.user_id !== user.id) return res.status(403).json({ message: "Forbidden" });
  res.json(t);
};

export const updateTicket = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = updateTicketSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user = (req as any).user as { id:number; role:"user"|"support"|"admin" };

  const current = await prisma.ticket.findUnique({ where: { id } });
  if (!current) return res.status(404).json({ message: "Not found" });

  if (user.role === "user") {
    if (current.user_id !== user.id) return res.status(403).json({ message: "Forbidden" });
    if (current.status !== "open") return res.status(400).json({ message: "Cannot edit after open phase" });
    const { title, description } = parsed.data;
    const updated = await prisma.ticket.update({ where:{ id }, data: { title, description } });
    return res.json(updated);
  }

  if (user.role === "support") {
    const { status } = parsed.data;
    if (!status) return res.status(400).json({ message: "Support can only change status" });
    const updated = await prisma.ticket.update({ where:{ id }, data: { status } });
    return res.json(updated);
  }

  const updated = await prisma.ticket.update({ where:{ id }, data: parsed.data });
  res.json(updated);
};

export const deleteTicket = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.ticket.delete({ where: { id } });
  res.status(204).end();
};
