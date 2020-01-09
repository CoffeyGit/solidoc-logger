
import { SolidocLogger } from '../index'

//默认只在控制台输出,默认topic
let log = new SolidocLogger()

//默认只在控制台输出,设置topic
let log2 = new SolidocLogger('test-topic')

//默认只在控制台输出,设置topic, level
let log3 = new SolidocLogger('test-topic', SolidocLogger.DEBUG)

//默认只在控制台输出,设置topic, level, consoleShow
let log4 = new SolidocLogger('test-topic', SolidocLogger.DEBUG, true)


//默认只在控制台输出,设置topic, level, level, consoleShow
let log5 = new SolidocLogger(
     'test-topic',
     SolidocLogger.DEBUG,
     true,
     {
          path: "./logs/test.log",
          period: "1d",
          count: 30
     }
)

log.trace("this is a trace msg")
log2.info('this is a info msg')
log3.debug('this is a debug msg', { temperature: 80, status: { started: 'yes', overheated: 'no' } })
log4.warn('this is a warn msg', { temperature: 120 })
log5.fatal('this is a fatal msg')
log.error('this is a error msg', new Error('temperature: 200'))

