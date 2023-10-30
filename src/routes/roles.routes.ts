import { Router } from "express";
import { getRoles, getRole, postRole, putRole, deleteRole } from "../controllers/roles.controller";

const router = Router();

/* The code is defining the routes for handling HTTP requests in an Express application. */
router.get('/', getRoles);
router.get('/:id', getRole);
router.post('/', postRole);  
router.put('/:id', putRole);
router.delete('/:id', deleteRole);

export default router;