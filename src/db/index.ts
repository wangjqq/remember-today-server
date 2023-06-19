import mysql from 'mysql'

const db = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  port: process.env.port as any,
  password: process.env.password,
  database: process.env.database,
})

module.exports = db
