import { Router } from "express";
import { getPermissions, postPermission,  putPermission, deletePermission } from "../controllers/permissions.controller";

const router = Router();

router.get('/', getPermissions);
router.post('/', postPermission);
router.put('/:id', putPermission);
router.delete('/:id', deletePermission);


export default router;