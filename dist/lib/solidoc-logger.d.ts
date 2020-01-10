import Logger from 'bunyan';
import { FileStoreOption } from './solidoc-option';
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
export declare class SolidocLogger extends Logger {
    topic: string;
    constructor(topic?: string, level?: number, consoleShow?: boolean, fileStore?: FileStoreOption);
}
