import { __decorate, __metadata, __param } from "tslib";
import { createLogger } from 'bunyan';
import { Inject, Injectable } from '@libs/dependency-injection';
import { symbols } from '../../symbols.js';
export let LoggerClientFactoryImpl = class LoggerClientFactoryImpl {
    loggerModuleConfig;
    constructor(loggerModuleConfig) {
        this.loggerModuleConfig = loggerModuleConfig;
    }
    create() {
        const logLevel = this.loggerModuleConfig.logLevel;
        const loggerClient = createLogger({ name: 'logger', level: logLevel });
        return loggerClient;
    }
};
LoggerClientFactoryImpl = __decorate([
    Injectable(),
    __param(0, Inject(symbols.loggerModuleConfig)),
    __metadata("design:paramtypes", [Object])
], LoggerClientFactoryImpl);
