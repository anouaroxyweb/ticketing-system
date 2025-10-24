import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { deleteUser, listUsers, updateUser } from "../controllers/user.controller.js";

const r = Router();
r.use(auth, requireRole("admin"));
r.get("/", listUsers);
r.put("/:id", updateUser);
r.delete("/:id", deleteUser);
export default r;
