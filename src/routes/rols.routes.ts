import { Router } from "express";
import { getRols, getRol, postRol, putRol, deleteRol } from "../controllers/rols.controller";

const router = Router();

router.get('/', getRols);
router.get('/:id', getRol);
router.post('/', postRol);  
router.put('/:id', putRol);
router.delete('/:id', deleteRol);

export default router;