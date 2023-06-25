import crypto from 'crypto'
import { downloadImage } from '../utils/utils'

export const wxLogin = (req: any, res: any) => {
  const { avatar } = req.body
  const UUID = crypto.randomUUID()
  downloadImage(avatar, `./static/avatar/${UUID}.png`)
  res.send({
    status: 200,
    message: req.body,
  })
}
