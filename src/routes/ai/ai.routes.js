import expressRouter from 'express';
import { assistant } from '../../controllers/ai/ai.controller.js'
import { verifyToken } from '../../middlewares/validate_token.js';

const router = expressRouter.Router()

router.post('/assistant', verifyToken, assistant)

export default router