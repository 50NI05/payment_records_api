import expressRouter from 'express';
import { addPayment, getPayment, updatePayment, deletePayment } from '../../controllers/payment/payment.controller.js'

const router = expressRouter.Router()

router.post('/addPayment', addPayment)
router.get('/getPayment', getPayment)
router.patch('/updatePayment/:id', updatePayment)
router.delete('/deletePayment/:id', deletePayment)

export default router