import { createLogger, LogLevel } from 'bunyan';

import { LoggerClientFactory } from './loggerClientFactory.js';
import { Inject, Injectable } from '@libs/dependency-injection';
import { LoggerClient } from '../../clients/loggerClient/loggerClient.js';
import { LoggerModuleConfig } from '../../loggerModuleConfig.js';
import { symbols } from '../../symbols.js';

@Injectable()
export class LoggerClientFactoryImpl implements LoggerClientFactory {
  public constructor(
    @Inject(symbols.loggerModuleConfig)
    private readonly loggerModuleConfig: LoggerModuleConfig,
  ) {}

  public create(): LoggerClient {
    const logLevel = this.loggerModuleConfig.logLevel as LogLevel;

    const loggerClient = createLogger({ name: 'logger', level: logLevel });

    return loggerClient;
  }
}
