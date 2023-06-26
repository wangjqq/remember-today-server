import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/../../.env' })
const { host, user, port, password, database } = process.env

const db = mysql.createPool({
  host: host,
  user: user,
  port: port as any,
  password: password,
  database: database,
})

export default db
