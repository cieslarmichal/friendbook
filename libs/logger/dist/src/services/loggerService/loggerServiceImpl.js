import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable } from '@libs/dependency-injection';
import { symbols } from '../../symbols.js';
export let LoggerServiceImpl = class LoggerServiceImpl {
    loggerClient;
    constructor(loggerClient) {
        this.loggerClient = loggerClient;
    }
    fatal(payload) {
        const { message, context } = payload;
        this.loggerClient.fatal({ context: context ?? {} }, message);
    }
    error(payload) {
        const { message, context } = payload;
        this.loggerClient.error({ context: context ?? {} }, message);
    }
    warn(payload) {
        const { message, context } = payload;
        this.loggerClient.warn({ context: context ?? {} }, message);
    }
    info(payload) {
        const { message, context } = payload;
        this.loggerClient.info({ context: context ?? {} }, message);
    }
    debug(payload) {
        const { message, context } = payload;
        this.loggerClient.debug({ context: context ?? {} }, message);
    }
    log(payload) {
        const { message, context } = payload;
        this.loggerClient.info({ context: context ?? {} }, message);
    }
};
LoggerServiceImpl = __decorate([
    Injectable(),
    __param(0, Inject(symbols.loggerClient)),
    __metadata("design:paramtypes", [Object])
], LoggerServiceImpl);
