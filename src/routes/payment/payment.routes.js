import expressRouter from 'express';
import { addPayment } from '../../controllers/payment/payment.controller.js'

const router = expressRouter.Router()

router.post('/addPayment', addPayment)
// router.post('/logout', verifyToken, logOut)

export default router