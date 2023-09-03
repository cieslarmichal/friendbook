import { LoggerClient } from './clients/loggerClient/loggerClient.js';
import { LoggerClientFactoryImpl } from './factories/loggerClientFactory/loggerClientFactoryImpl.js';
import { LoggerModuleConfig } from './loggerModuleConfig.js';
import { symbols } from './symbols.js';
import { LoggerService } from './services/loggerService/loggerService.js';
import { LoggerServiceImpl } from './services/loggerService/loggerServiceImpl.js';
import { DependencyInjectionModule, DependencyInjectionContainer } from '@libs/dependency-injection';

export class LoggerModule implements DependencyInjectionModule {
  public constructor(private readonly config: LoggerModuleConfig) {}

  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToValue<LoggerModuleConfig>(symbols.loggerModuleConfig, this.config);

    container.bindToFactory<LoggerClient>(symbols.loggerClient, LoggerClientFactoryImpl);

    container.bindToConstructor<LoggerService>(symbols.loggerService, LoggerServiceImpl);
  }
}
