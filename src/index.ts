import express, { Request, Response, Application } from 'express'
import cors from 'cors'
import scheduleRouter from './router/schedule'
import wxMsgRouter from './router/wxMsg'
import userRouter from './router/user'

const app: Application = express()
const PORT = 3007

app.use(
  cors({
    origin: 'https://localhost:8080',
    credentials: true,
  })
)
app.use(express.json()) // for application/json
app.use(express.urlencoded()) // for application/x-www-form-urlencoded

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

app.listen(PORT, (): void => {
  console.log(`服务已运行在http://localhost:${PORT}`)
})
