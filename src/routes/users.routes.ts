import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/users.controller";

import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { GetUsersMiddleware, PostUsersMiddleware } from "../middlewares/users.middlewares";

const router = Router();

/* The code is defining the routes for handling HTTP requests related to users. */
// router.get('/', extractUserMiddlewares, GetUsersMiddleware, getUsers);
router.get('/', getUsers);
router.get('/:id', getUser);
// router.post('/', extractUserMiddlewares, PostUsersMiddleware, postUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

export default router;