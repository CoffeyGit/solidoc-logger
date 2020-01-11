"use strict";
/*
 * @Author: your name
 * @Date: 2020-01-09 14:28:57
 * @LastEditTime : 2020-01-11 15:56:27
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /solidoc-logger/test/solidoc-logger-test.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
//import { SolidocLogger } from '../dist/index'
//默认只在控制台输出,默认topic
var log = new index_1.SolidocLogger();
//默认只在控制台输出,设置topic
var log2 = new index_1.SolidocLogger('test-topic');
//默认只在控制台输出,设置topic, level
var log3 = new index_1.SolidocLogger('test-topic', index_1.SolidocLogger.DEBUG);
//默认只在控制台输出,设置topic, level, consoleShow
var log4 = new index_1.SolidocLogger('test-topic', index_1.SolidocLogger.DEBUG, true);
//默认只在控制台输出,设置topic, level, level, consoleShow
var log5 = new index_1.SolidocLogger('test-topic', index_1.SolidocLogger.DEBUG, true, {
    path: "./logs/test.log",
    period: "1d",
    count: 30
});
log.trace("this is a trace msg");
log2.info('this is a info msg');
log3.debug('this is a debug msg', { temperature: 80, status: { started: 'yes', overheated: 'no' } });
log4.warn('this is a warn msg', { temperature: 120 });
log5.fatal('this is a fatal msg');
log.error('this is a error msg', new Error('temperature: 200'));
