import { Router } from "express";
import { getPermissions, getPermission, postPermission,  putPermission, deletePermission } from "../controllers/permissions.controller";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/permissions.middlewares";

const router = Router();

/* These lines of code are defining the routes for handling HTTP requests in an Express.js application. */
router.get('/', getPermissions);
router.get('/:id', extractUserMiddlewares, validateRouteGet, getPermission);
router.post('/', extractUserMiddlewares, validateRoutePost, postPermission);
router.put('/:id', extractUserMiddlewares, validateRoutePut, putPermission);
router.delete('/:id', extractUserMiddlewares, validateRouteDelete, deletePermission);

export default router;