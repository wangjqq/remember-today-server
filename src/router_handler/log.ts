import db from '../db'

// 新增日志
export const addLog = (req: any, res: any) => {
  const data = req.body
  const sqlStr = 'insert into log_activity set ?'

  db.query(sqlStr, data, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    res.send({
      code: '200',
      message: 'success',
    })
  })
}

// 查询日志
export const getLog = (req: any, res: any) => {
  const { page, size, category, level, time, name } = req.query
  // 计算偏移量
  const offset = (page - 1) * size
  // 构建查询条件
  const conditions = []
  // 如果有 category 参数，添加到条件数组中
  if (category) {
    conditions.push(`category = '${category}'`)
  }
  // 如果有 level 参数，添加到条件数组中
  if (level) {
    conditions.push(`level = '${level}'`)
  }
  // 如果有 time 参数，添加到条件数组中
  if (time) {
    conditions.push(`time = '${time}'`)
  }
  // 如果有 name 参数，添加到条件数组中，使用 LIKE 运算符和 % 通配符实现模糊查询
  if (name) {
    conditions.push(`flag_id LIKE '%${name}%'`)
  }
  // 将条件数组用 AND 连接成字符串
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  // 构建完整的 sql 语句，使用 LIMIT 和 OFFSET 实现分页
  const sqlStr = `SELECT * FROM log_activity ${whereClause} ORDER BY id DESC LIMIT ${size} OFFSET ${offset}   `
  console.log(sqlStr)
  db.query(sqlStr, (err, results1) => {
    if (err) {
      return res.cc(err)
    }
    // 使用和之前相同的条件查询，但是不使用 LIMIT 和 OFFSET
    const sqlStrCount = `SELECT * FROM log_activity ${whereClause}`
    // 执行 sqlStrCount 语句，获取 total 的值
    db.query(sqlStrCount, (err, results) => {
      if (err) {
        return res.cc(err)
      }
      res.send({
        code: '200',
        message: 'success',
        data: { list: results1, total: results.length },
      })
    })

    // const total = result[0].total
    // 将 total 返回给前端，或者和分页数据一起返回
  })
}
