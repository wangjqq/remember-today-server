import crypto from 'crypto'
import { downloadImage } from '../utils/utils'
import db from '../db'

export const wxLogin = (req: any, res: any) => {
  const { headimgurl = 'https://www.baidu.com/img/bd_logo1.png', nickname = '今日有记用户' } = req.body
  const UUID = crypto.randomUUID()
  downloadImage(headimgurl, `./static/avatar/${UUID}.png`)

  const sqlStr = 'insert into user_info set ?'

  const timeElapsed = Date.now()
  const nowDate = new Date(timeElapsed)

  db.query(sqlStr, { ...req.body, headimgurl: UUID, registerTime: nowDate.toLocaleString() }, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    res.send({
      code: '200',
      message: 'success',
    })
  })
}
