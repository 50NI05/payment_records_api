import expressRouter from 'express';
import { addPayment, getPayment, updatePayment, deletePayment } from '../../controllers/payment/payment.controller.js'
import { verifyToken } from '../../middlewares/validate_token.js';

const router = expressRouter.Router()

router.post('/addPayment', verifyToken, addPayment)
router.get('/getPayment', verifyToken, getPayment)
router.patch('/updatePayment/:id', verifyToken, updatePayment)
router.delete('/deletePayment/:id', verifyToken, deletePayment)

export default router