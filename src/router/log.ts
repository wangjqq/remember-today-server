import express from 'express'
import { addLog } from '../router_handler/log'

const logRouter = express.Router()

logRouter.post('/log/addLog', addLog)

export default logRouter
