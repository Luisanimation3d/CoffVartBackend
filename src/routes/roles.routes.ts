import { Router } from "express";
import { getRoles, getRole, postRole, putRole, deleteRole } from "../controllers/roles.controller";

const router = Router();

router.get('/', getRoles);
router.get('/:id', getRole);
router.post('/', postRole);  
router.put('/:id', putRole);
router.delete('/:id', deleteRole);

export default router;