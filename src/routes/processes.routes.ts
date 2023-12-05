import { Router } from "express";
import { getProcesses,getProcess,postProcesses,putProcesses,deleteProcesses, } from "../controllers/processes.controller";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/processes.middleware";

const router= Router();


/* These lines of code are defining the routes for handling HTTP requests in an Express.js application. */
router.get("/",/*extractUserMiddlewares,*/getProcesses);
router.get('/:id',/*extractUserMiddlewares,validateRouteGet,*/getProcess);
router.post("/",/*extractUserMiddlewares,validateRoutePost,*/postProcesses);
router.put("/:id",/*extractUserMiddlewares,validateRoutePut,*/putProcesses);
router.delete("/:id",/*extractUserMiddlewares,validateRouteDelete,*/deleteProcesses);

export default router;