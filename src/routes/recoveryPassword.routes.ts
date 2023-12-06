import {Router} from "express";
import {sendEmail, recoveryPassword} from "../controllers/recoveryPassword.controller";

const router = Router();

router.post('/forgot-password', sendEmail);
router.post('/changePass', recoveryPassword);

export default router;