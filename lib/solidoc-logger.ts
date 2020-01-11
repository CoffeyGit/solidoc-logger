//import bunyan from 'bunyan'
import bunyan = require('bunyan')
import { FileStoreOption } from './solidoc-option'
const logFormat = require('bunyan-format')



/** 
 * @Author: Coffey
 * @Date: 2020-01-06 17:44:36
 * @LastEditTime : 2020-01-08 18:08:29

 * @param topic  日志主题，用于日志分类和后期处理
 * @param level  设置日志level，可选值：TRACE,DEBUG,INFO,WARN,ERROR,FATAL
 * @param consoleShow  是否在控制台显示，默认true，在控制台显示
 * @param fileStore {FileStoreOption}  是否需要同时输出到日志文件中，默认不输出，如需要输出需要配置输出配置
 *
 */
export class SolidocLogger extends bunyan {
     topic: string

     constructor(topic: string = 'def-topic', level: number = bunyan.INFO, consoleShow: boolean = true, fileStore?:
          FileStoreOption) {
          let streams = Array()

          if (consoleShow) {
               let consoleOutStream = logFormat({ outputMode: 'long', color: true }, process.stdout)
               streams.push(
                    {
                         stream: consoleOutStream,
                         name: topic,
                    })
          }

          if (fileStore) {
               let outStream = {
                    type: 'rotating-file',
                    path: '',
                    period: '1d',   // daily rotation
                    count: 30       // keep 3 back copies
               }

               let fileStreamOption = { ...outStream, ...fileStore }

               let stream = new bunyan.RotatingFileStream(fileStreamOption)

               let fileOutStream = logFormat({ outputMode: 'long', color: true }, stream)
               streams.push({
                    stream: fileOutStream,
                    name: topic
               })
          }

          super({ name: topic, level: level, src: true, streams })
          this.topic = topic
     }
}



