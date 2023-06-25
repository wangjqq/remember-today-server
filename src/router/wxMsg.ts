import express from 'express'
import { getWxMsg, postWxMsg } from '../router_handler/wxMsg'

const wxMsgRouter = express.Router()

wxMsgRouter.get('/wxMsg/getWxMsg', getWxMsg)
wxMsgRouter.post('/wxMsg/postWxMsg', postWxMsg)

export default wxMsgRouter
