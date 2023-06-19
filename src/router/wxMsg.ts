import express from 'express'
import { getWxMsg } from '../router_handler/wxMsg'

const wxMsgRouter = express.Router()

wxMsgRouter.get('/wxMsg/getWxMsg', getWxMsg)

export default wxMsgRouter
