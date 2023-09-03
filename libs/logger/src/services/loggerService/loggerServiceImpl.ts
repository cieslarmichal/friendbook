import { LogPayload, LoggerService } from './loggerService.js';
import { LoggerClient } from '../../clients/loggerClient/loggerClient.js';
import { Inject, Injectable } from '@libs/dependency-injection';
import { symbols } from '../../symbols.js';

@Injectable()
export class LoggerServiceImpl implements LoggerService {
  public constructor(
    @Inject(symbols.loggerClient)
    private readonly loggerClient: LoggerClient,
  ) {}

  public fatal(payload: LogPayload): void {
    const { message, context } = payload;

    this.loggerClient.fatal({ context: context ?? {} }, message);
  }

  public error(payload: LogPayload): void {
    const { message, context } = payload;

    this.loggerClient.error({ context: context ?? {} }, message);
  }

  public warn(payload: LogPayload): void {
    const { message, context } = payload;

    this.loggerClient.warn({ context: context ?? {} }, message);
  }

  public info(payload: LogPayload): void {
    const { message, context } = payload;

    this.loggerClient.info({ context: context ?? {} }, message);
  }

  public debug(payload: LogPayload): void {
    const { message, context } = payload;

    this.loggerClient.debug({ context: context ?? {} }, message);
  }

  public log(payload: LogPayload): void {
    const { message, context } = payload;

    this.loggerClient.info({ context: context ?? {} }, message);
  }
}
