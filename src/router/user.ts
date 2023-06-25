import express from 'express'
import { wxLogin } from '../router_handler/user'

const userRouter = express.Router()

userRouter.post('/user/wxLogin', wxLogin)

export default userRouter
