import crypto from 'crypto'
import dotenv from 'dotenv'

export const getWxMsg = (req: any, res: any) => {
  dotenv.config({ path: __dirname + '/../../.env' })
  const { signature = '', echostr = '', timestamp = '', nonce = '' } = req.query
  let sha1 = crypto.createHash('sha1').update([process.env.wxToken, timestamp, nonce].sort().join('')).digest('hex')
  if (sha1 == signature) {
    res.send(echostr)
  } else {
    res.send({
      status: 500,
      message: '非法!',
    })
  }
}

export const postWxMsg = (req: any, res: any) => {
  console.log(req.body)
  res.send('')
}
