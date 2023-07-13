import db from '../db'
import logger from '../log'

export const initFn = () => {
  const data = { info: '系统启动', category: 'SYS', level: 'INFO', timestamp: Date.now() }
  const sqlStr = 'insert into log_activity set ?'

  db.query(sqlStr, data, (err, results) => {
    if (err) {
      logger.error(`系统初始化失败${err instanceof Error ? err.message : err}`)
    }
  })
}
