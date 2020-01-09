[toc]

## 介绍

Solidoc-Logger是一款基于 [bunyan](https://github.com/trentm/node-bunyan)实现的node.js日志模块，支持两种：控制台 和 日志文件 两个种输出格式。其具有一下特性：

* 多Level级别控制
* Topic设置
* 日志文件滚动自动滚动：
    * 日志分割周期：小时，天，周，月等
    * 日志保留最大数量
* 自动记录日志打印触发位置（文件，方法，行）
* 提供输出流接口配置，可以轻松对接第三方日志工具（kafka等）



## 安装

```
npm install solidoc-logger
```

## 使用说明

### 使用示例


```
import { SolidocLogger } from 'solidoc-logger'

let log = new SolidocLogger("test-topic", SolidocLogger.DEBUG)

log.trace("this is a trace msg")

log.info('this is a info msg')

log.debug('things are heating up', { temperature: 80, status: { started: 'yes', overheated: 'no' } })

log.warn('getting a bit hot', { temperature: 120 })

log.fatal('I died! Do you know what that means???')

log.error('Ho it burns!', new Error('temperature: 200'))

```

以上示例代码分别输出

```
// TRACE 
[2020-01-09T09:13:18.067Z] TRACE: test-topic/39466  (solidoc-logger-test.ts:5): this is a trace msg

// INFO 
[2020-01-09T09:13:18.070Z]  INFO: test-topic/39466  (/solidoc-logger-test.ts:6): this is a info msg

// DEBUG 
[2020-01-09T09:13:18.071Z] DEBUG: test-topic/39466 (/solidoc-
logger-test.ts:7): this is a debug msg { temperature: 80, status: { started: 'yes', overheated: 'no' } }

// WARN
[2020-01-09T09:13:18.074Z]  WARN: test-topic/39466 (/solidoc-logger-test.ts:8): this is a warn msg { temperature: 120 }

// FATAL
[2020-01-09T09:13:18.075Z] FATAL: test-topic/39466  (/solidoc-logger-test.ts:9): this is a fatal msg

// ERROR
[2020-01-09T09:13:18.118Z] ERROR: test-topic/39466 (/solidoc-logger-test.ts:10):
  this is a error msg Error: temperature: 200
      at Object.<anonymous> (solidoc-logger-test.ts:11:34)
      at Module._compile (internal/modules/cjs/loader.js:956:30)
      at Module.m._compile (/ts-node/src/index.ts:536:23)
      at Module._extensions..js (internal/modules/cjs/loader.js:973:10)
      at Object.require.extensions.<computed> [as .ts] (/usr/local/lib/node_modules/ts-node/src/index.ts:539:12)
      at Module.load (internal/modules/cjs/loader.js:812:32)
      at Function.Module._load (internal/modules/cjs/loader.js:724:14)
      at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
      at main (/usr/local/lib/node_modules/ts-node/src/bin.ts:212:14)
      at Object.<anonymous> (/usr/local/lib/node_modules/ts-node/src/bin.ts:470:3)

```


### 构造函数

```
let log = new SolidocLogger(
    topic: <string>,  // 可选，默认: def-topic
    level: <level name or number>, //可选, 见后面"Levels"部分说明
    consoleShow: <boolean>,    // 可选, 是否在控制台输出，默认输出
    fileStore: <FileStoreOption> // 可选，配置日志文件想关信息，讲后面FileStoreOption部分说明 
  )

```

示例：

```
//默认只在控制台输出,默认topic
let log = new SolidocLogger()

//默认只在控制台输出,设置topic
let log2 = new SolidocLogger('test-topic')

//默认只在控制台输出,设置topic, level
let log3 = new SolidocLogger('test-topic', SolidocLogger.DEBUG)

//默认只在控制台输出,设置topic, level, consoleShow
let log4 = new SolidocLogger('test-topic', SolidocLogger.DEBUG, true)


//默认只在控制台输出,设置topic, level, level, consoleShow, fileStore
let log5 = new SolidocLogger(
     'test-topic',
     SolidocLogger.DEBUG,
     true,
     {
          path: "./logs/test.log",
          period: "1d",   //每天滚动分割日志文件
          count: 30       //保留文件个数
     }
)

```


### Level

日志等级：

```
const TRACE: number;
const DEBUG: number;
const INFO: number;
const WARN: number;
const ERROR: number;
const FATAL: number;
```
    
### FileStoreOption

```
interface FileStoreOption {
     path: string,    //日志文件路径
     period?: string, //可选，日志滚动周期。默认：1天
     count?: number   //可选，保留日志文件个数。默认：30
}

```

>  `period`：`<number><scope>`  i.e:  1h ,1d ,1w ,1m ,1y 
>>  h   hours (at the start of the hour)
>>  d   days (at the start of the day, i.e. just after midnight)
>>  w   weeks (at the start of Sunday)
>>  m   months (on the first of the month)
>>  y   years (at the start of Jan 1st)
              
              
         