import crypto from 'crypto'

export const getWxMsg = (req: any, res: any) => {
  console.log(req)
  console.log(req.query)
  if (req.query.timestamp) {
    const { signature, echostr, timestamp, nonce } = req.query
    let a = crypto.createHash('sha1').update([process.env.wxToken, timestamp, nonce].sort().join('')).digest('hex')
    if (a == signature) {
      res.send(echostr)
    } else {
      res.send({
        status: 500,
        message: '非法!',
      })
    }
  } else {
    res.send({
      status: 500,
      message: '非法!',
    })
  }
}
