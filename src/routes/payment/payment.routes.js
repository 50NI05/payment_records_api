import expressRouter from 'express';
import { addPayment, getPayment, deletePayment } from '../../controllers/payment/payment.controller.js'

const router = expressRouter.Router()

router.post('/addPayment', addPayment)
router.get('/getPayment', getPayment)
router.delete('/deletePayment/:id', deletePayment)

export default router