import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import scheduleRouter from './router/schedule'
import wxMsgRouter from './router/wxMsg'
import userRouter from './router/user'
import logRouter from './router/log'

dotenv.config({ path: __dirname + '/../.env' })

const app: Application = express()

app.use(
  cors({
    origin: 'https://localhost:8080',
    credentials: true,
  })
)
app.use(express.json()) // for application/json
app.use(express.urlencoded({ extended: true })) // for application/x-www-form-urlencoded

app.use((req, res: any, next) => {
  res.cc = function (err: any, status = 500) {
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

app.listen(3007, (): void => {
  console.log('服务已运行在http://localhost:3007')
})
