import express, { Request, Response, Application } from 'express'
import cors from 'cors'
import scheduleRouter from './router/schedule'
import wxMsgRouter from './router/wxMsg'

const app: Application = express()
const PORT = 3007

app.use(
  cors({
    origin: 'https://localhost:8080',
    credentials: true,
  })
)

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

app.listen(PORT, (): void => {
  console.log(`服务已运行在http://localhost:${PORT}`)
})
