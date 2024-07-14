"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    time() {
        return new Date().toString();
    }
    formatLog(level, message) {
        console.log(level, '|', this.time(), '|', message);
    }
    info(message) {
        this.formatLog('INFO', message);
    }
    error(message) {
        this.formatLog('ERROR', message);
    }
}
exports.Logger = Logger;
