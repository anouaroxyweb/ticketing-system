import { prisma } from "../prisma.js";
import { Request, Response } from "express";
import { updateUserSchema } from "../validators/user.validators.js";
export const listUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: { id:true, username:true, email:true, role:true, created_at:true } });
  res.json(users);
};
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user = await prisma.user.update({ where: { id }, data: parsed.data, select: { id:true, username:true, email:true, role:true } });
  res.json(user);
};
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.status(204).end();
};
