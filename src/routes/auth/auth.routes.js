import expressRouter from 'express';
import { logIn, logOut } from '../../controllers/auth/auth.controller.js'
import { verifyToken } from "../../middlewares/validate_token.js";

const router = expressRouter.Router()

router.post('/login', logIn)
router.post('/logout', verifyToken, logOut)

export default router