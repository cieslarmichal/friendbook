import { LogLevel } from '../../../logLevel.js';
import { LoggerModuleConfig } from '../../../loggerModuleConfig.js';

export class LoggerModuleConfigTestFactory {
  public create(input: Partial<LoggerModuleConfig> = {}): LoggerModuleConfig {
    return {
      logLevel: LogLevel.debug,
      ...input,
    };
  }
}
