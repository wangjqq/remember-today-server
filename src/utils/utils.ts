const https = require('https')
const fs = require('fs')

/**
 * 下载图片
 *
 * @param downloadUrl 要下载的图片地址
 * @param saveUrl 保存路径(带文件名后缀)
 */
export const downloadImage = (downloadUrl: string, saveUrl: string) => {
  https.get(downloadUrl, (res: any) => {
    var imgData = ''
    res.setEncoding('binary') // 下载图片需要设置为 binary, 否则图片会打不开

    res.on('data', (chunk: any) => {
      imgData += chunk
    })

    res.on('end', () => {
      fs.writeFileSync(saveUrl, imgData, 'binary')
    })
  })
}
