import {Router} from "express";
import {sendEmail, recoveryPassword} from "../controllers/recoveryPassword.controller";

const router = Router();

router.post('/forgot-password', sendEmail);
router.post('/reset-password', recoveryPassword);

export default router;