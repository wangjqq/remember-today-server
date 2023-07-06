import express from 'express'
import { getSystemInfo } from '../router_handler/system'

const systemRouter = express.Router()

systemRouter.get('/system/getSystemInfo', getSystemInfo)

export default systemRouter
