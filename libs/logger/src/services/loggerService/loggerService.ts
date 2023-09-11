import { LogContext } from '../../logContext.js';

export interface LogPayload {
  readonly message: string;
  readonly context?: LogContext;
}

export interface LoggerService {
  fatal(input: LogPayload): void;
  error(input: LogPayload): void;
  warn(input: LogPayload): void;
  info(input: LogPayload): void;
  debug(input: LogPayload): void;
  log(input: LogPayload): void;
}
