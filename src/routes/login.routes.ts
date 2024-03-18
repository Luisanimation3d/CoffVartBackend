import { Router } from "express";
import { loginController, logoutController, getTokenData, validateToken } from "../controllers/login.controller";
import { loginMiddlewares } from "../middlewares/login.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router = Router();

/* The code is defining two routes for the router object. */
router.post('/', loginMiddlewares, loginController);
router.get('/logout', extractUserMiddlewares, logoutController);
router.get('/getTokenData', extractUserMiddlewares, getTokenData);
router.get('/validateToken', validateToken);

export default router;