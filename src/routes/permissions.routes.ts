import { Router } from "express";
import { getPermissions, postPermission,  putPermission, deletePermission } from "../controllers/permissions.controller";
import { validateRoutePost } from "../middlewares/permissions.middlewares";

const router = Router();

router.get('/', getPermissions);
router.post('/', validateRoutePost, postPermission);
router.put('/:id', putPermission);
router.delete('/:id', deletePermission);

export default router;