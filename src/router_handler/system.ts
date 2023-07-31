import db from '../db'

export const getSystemInfo = (req: any, res: any) => {
  const { num } = req.query
  const sqlStr = `SELECT * FROM ( SELECT * FROM sys_run_log ORDER BY id DESC LIMIT ${num} ) AS t ORDER BY id ASC;`

  db.query(sqlStr, {}, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    res.send({
      code: '200',
      message: 'success',
      data: results,
    })
  })
}

export const getUpdateInfo = (req: any, res: any) => {
  const sqlStr = 'SELECT * FROM update_info'

  db.query(sqlStr, {}, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    res.send({
      code: '200',
      message: 'success',
      data: results,
    })
  })
}

export const addUpdateInfo = (req: any, res: any) => {
  const sqlStr = 'INSERT INTO update_info SET ?'

  db.query(sqlStr, req.body, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    res.send({
      code: '200',
      message: 'success',
      data: results,
    })
  })
}
