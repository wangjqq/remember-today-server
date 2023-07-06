import express from 'express'
import { addLog, getLog } from '../router_handler/log'

const logRouter = express.Router()

logRouter.get('/log/getLog', getLog)
logRouter.post('/log/addLog', addLog)

export default logRouter
