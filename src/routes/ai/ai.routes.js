import expressRouter from 'express';
import { test } from '../../controllers/ai/ai.controller.js'

const router = expressRouter.Router()

router.post('/test', test)

export default router