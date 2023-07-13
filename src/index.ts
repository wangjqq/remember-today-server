import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import scheduleRouter from './router/schedule'
import wxMsgRouter from './router/wxMsg'
import userRouter from './router/user'
import logRouter from './router/log'
import { scheduleJob } from './utils/system'
import systemRouter from './router/system'
import { initFn } from './utils/init'
import db from './db'

dotenv.config({ path: __dirname + '/../.env' })

const app: Application = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json()) // for application/json
app.use(express.urlencoded({ extended: true })) // for application/x-www-form-urlencoded

app.use((req, res: any, next) => {
  res.cc = function (err: any, status = 500) {
    const data = {
      info: `数据库操作失败:${err instanceof Error ? err.message : err},body:${JSON.stringify(
        req.body
      )},query:${JSON.stringify(req.query)},params:${JSON.stringify(req.params)},originalUrl:${req.originalUrl}`,
      category: 'SYS',
      level: 'ERROR',
      timestamp: Date.now(),
    }
    const sqlStr = 'insert into log_activity set ?'
    db.query(sqlStr, data)
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

app.use(scheduleRouter)
app.use(wxMsgRouter)
app.use(userRouter)
app.use(logRouter)
app.use(systemRouter)

scheduleJob()
initFn()

app.listen(3007, (): void => {
  console.log('服务已运行在http://localhost:3007')
})
