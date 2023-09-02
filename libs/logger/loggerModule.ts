import { LoggerClient } from './clients/loggerClient/loggerClient.js';
import { LoggerClientFactoryImpl } from './factories/loggerClientFactory/loggerClientFactoryImpl.js';
import { LoggerModuleConfig } from './loggerModuleConfig.js';
import { symbols } from './symbols.js';
import { LoggerService } from './services/loggerService/loggerService.js';
import { LoggerServiceImpl } from './services/loggerService/loggerServiceImpl.js';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer.js';
import { DependencyInjectionModule } from '../dependencyInjection/dependencyInjectionModule.js';

export class LoggerModule implements DependencyInjectionModule {
  public constructor(private readonly config: LoggerModuleConfig) {}

  public async declareBindings(container: DependencyInjectionContainer): Promise<void> {
    container.bindToValue<LoggerModuleConfig>(symbols.loggerModuleConfig, this.config);

    container.bindToFactory<LoggerClient>(symbols.loggerClient, LoggerClientFactoryImpl);

    container.bindToConstructor<LoggerService>(symbols.loggerService, LoggerServiceImpl);
  }
}
