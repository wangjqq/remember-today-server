import express from 'express'
import { getSystemInfo, getUpdateInfo, addUpdateInfo } from '../router_handler/system'

const systemRouter = express.Router()

systemRouter.get('/system/getSystemInfo', getSystemInfo)
systemRouter.get('/system/getUpdateInfo', getUpdateInfo)
systemRouter.post('/system/addUpdateInfo', addUpdateInfo)

export default systemRouter
