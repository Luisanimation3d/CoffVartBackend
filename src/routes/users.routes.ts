import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/users.controller";

import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { GetUsersMiddleware, PostUsersMiddleware } from "../middlewares/users.middlewares";

const router = Router();

router.get('/', extractUserMiddlewares, GetUsersMiddleware, getUsers);
router.get('/:id', getUser);
router.post('/', extractUserMiddlewares, PostUsersMiddleware, postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

export default router;