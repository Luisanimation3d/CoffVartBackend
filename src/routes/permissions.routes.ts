import { Router } from "express";
import { getPermissions, getPermission, postPermission,  putPermission, deletePermission } from "../controllers/permissions.controller";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/permissions.middlewares";

const router = Router();

/* These lines of code are defining the routes for handling HTTP requests in an Express.js application. */
router.get('/', getPermissions);
router.get('/:id',  /*validateRouteGet,*/ getPermission);
router.post('/',  /*validateRoutePost,*/ postPermission);
router.put('/:id',  /*validateRoutePut,*/ putPermission);
router.delete('/:id', /*validateRouteDelete,*/ deletePermission);

export default router;