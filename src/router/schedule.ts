import express from 'express'
import { getsss } from '../router_handler/schedule'

const scheduleRouter = express.Router()

scheduleRouter.get('/schedule/getAllScheduleList', getsss)

export default scheduleRouter
