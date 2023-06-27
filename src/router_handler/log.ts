import db from '../db'

export const addLog = (req: any, res: any) => {
  const data = req.body
  const sqlStr = 'insert into log_activity set ?'

  db.query(sqlStr, data, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    res.send({
      status: 200,
      message: 'success',
    })
  })
}
