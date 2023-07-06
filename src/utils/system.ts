import os from 'os'
import schedule from 'node-schedule'
import si from 'systeminformation'
import db from '../db'

const startTime = Math.floor(Date.now() / 1000)

export const scheduleJob = () => {
  //每分钟的第30秒定时执行一次:
  schedule.scheduleJob('1 10 * * * *', () => {
    async function getLoad() {
      const cpus = os.cpus()
      let totalTime = 0
      let totalIdle = 0
      for (let i = 0; i < cpus.length; i++) {
        let cpu: any = cpus[0]
        for (let type in cpu.times) {
          totalTime += cpu.times[type]
          if (type == 'idle') {
            totalIdle += cpu.times[type]
          }
        }
      }
      const CPUload = 100 - Math.round((totalIdle / totalTime) * 100)
      const date = new Date()
      const cpu_temperature = await si.cpuTemperature()
      return {
        cpu_utilization: CPUload,
        rem_utilization: 100 - Math.round((os.freemem() / os.totalmem()) * 100),
        total_rem: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
        free_rem: (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
        time: date.toLocaleString(),
        environmental_run_time: (os.uptime() / 60 / 60).toFixed(2),
        system_run_time: Math.floor(Date.now() / 1000) - startTime,
        cpu_temperature: cpu_temperature.main || 0,
      }
    }
    getLoad().then((res) => {
      const sqlStr = `INSERT INTO sys_run_log SET ?`
      db.query(sqlStr, res, (err, results) => {
        console.log(err, results)
      })
    })
  })
}
