import { LoggerClientFactoryImpl } from './factories/loggerClientFactory/loggerClientFactoryImpl.js';
import { symbols } from './symbols.js';
import { LoggerServiceImpl } from './services/loggerService/loggerServiceImpl.js';
export class LoggerModule {
    config;
    constructor(config) {
        this.config = config;
    }
    async declareBindings(container) {
        container.bindToValue(symbols.loggerModuleConfig, this.config);
        container.bindToFactory(symbols.loggerClient, LoggerClientFactoryImpl);
        container.bindToConstructor(symbols.loggerService, LoggerServiceImpl);
    }
}
