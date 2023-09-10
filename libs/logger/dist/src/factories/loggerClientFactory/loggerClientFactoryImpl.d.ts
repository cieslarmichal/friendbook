import { LoggerClientFactory } from './loggerClientFactory.js';
import { LoggerClient } from '../../clients/loggerClient/loggerClient.js';
import { LoggerModuleConfig } from '../../loggerModuleConfig.js';
export declare class LoggerClientFactoryImpl implements LoggerClientFactory {
    private readonly loggerModuleConfig;
    constructor(loggerModuleConfig: LoggerModuleConfig);
    create(): LoggerClient;
}
//# sourceMappingURL=loggerClientFactoryImpl.d.ts.map