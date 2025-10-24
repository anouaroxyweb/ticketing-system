import { z } from "zod";
export const createTicketSchema = z.object({
  title: z.string().min(1, "title required"),
  description: z.string().optional(),
});
export const updateTicketSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["open","in_progress","resolved","closed"]).optional(),
});
