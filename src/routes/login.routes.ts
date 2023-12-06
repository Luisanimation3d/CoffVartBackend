import { Router } from "express";
import { loginController, logoutController, getTokenData } from "../controllers/login.controller";
import { testEmail } from '../controllers/recoveryPassword.controller';
import { loginMiddlewares } from "../middlewares/login.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router = Router();

/* The code is defining two routes for the router object. */
router.post('/', loginMiddlewares, loginController);
router.get('/logout', extractUserMiddlewares, logoutController);
router.get('/getTokenData', extractUserMiddlewares, getTokenData);
router.get('/testEmail', testEmail);

export default router;