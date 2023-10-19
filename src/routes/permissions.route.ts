import { Router } from "express";
import { getPermissions } from "../controllers/permissions.controller";

const router = Router();

router.get('/', getPermissions);

export default router;