import expressRouter from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../controllers/user/user.controller.js'
import { verifyToken } from "../../middlewares/validate_token.js";

const router = expressRouter.Router()

router.get('/getUsers', verifyToken, getUsers)

router.get('/getUser/:id', verifyToken, getUser)

router.post('/register', createUser)

router.patch('/updateUser/:id', verifyToken, updateUser)

router.delete('/deleteUser/:id', verifyToken, deleteUser)

export default router