"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
//import bunyan from 'bunyan'
var bunyan = require("bunyan");
var logFormat = require('bunyan-format');
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
var SolidocLogger = /** @class */ (function (_super) {
    __extends(SolidocLogger, _super);
    function SolidocLogger(topic, level, consoleShow, fileStore) {
        if (topic === void 0) { topic = 'def-topic'; }
        if (level === void 0) { level = bunyan.INFO; }
        if (consoleShow === void 0) { consoleShow = true; }
        var _this = this;
        var streams = Array();
        if (consoleShow) {
            var consoleOutStream = logFormat({ outputMode: 'long', color: true }, process.stdout);
            streams.push({
                stream: consoleOutStream,
                name: topic
            });
        }
        if (fileStore) {
            var outStream = {
                type: 'rotating-file',
                path: '',
                period: '1d',
                count: 30 // keep 3 back copies
            };
            var fileStreamOption = __assign(__assign({}, outStream), fileStore);
            var stream = new bunyan.RotatingFileStream(fileStreamOption);
            var fileOutStream = logFormat({ outputMode: 'long', color: true }, stream);
            streams.push({
                stream: fileOutStream,
                name: topic
            });
        }
        _this = _super.call(this, { name: topic, level: level, src: true, streams: streams }) || this;
        _this.topic = topic;
        return _this;
    }
    return SolidocLogger;
}(bunyan));
exports.SolidocLogger = SolidocLogger;
