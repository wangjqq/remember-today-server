import log4js from 'log4js'

log4js.configure({
  appenders: {
    cheese: {
      // 设置类型为 dateFile
      type: 'dateFile',
      // 配置文件名为 run.log
      filename: __dirname + '/../../log/error.log',
      // 指定编码格式为 utf-8
      encoding: 'utf-8',
      // 配置 layout，此处使用自定义模式 pattern
      layout: {
        type: 'pattern',
        // 配置模式，下面会有介绍
        pattern: '{"date":"%d","level":"%p","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyy-MM-dd',
      // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
      keepFileExt: true,
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: true,
    },
  },
  categories: {
    // 设置默认的 categories
    default: { appenders: ['cheese'], level: 'error' },
  },
})

let logger = log4js.getLogger()

export default logger
