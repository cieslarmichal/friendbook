import { LogPayload, LoggerService } from './loggerService.js';
import { LoggerClient } from '../../clients/loggerClient/loggerClient.js';
export declare class LoggerServiceImpl implements LoggerService {
    private readonly loggerClient;
    constructor(loggerClient: LoggerClient);
    fatal(payload: LogPayload): void;
    error(payload: LogPayload): void;
    warn(payload: LogPayload): void;
    info(payload: LogPayload): void;
    debug(payload: LogPayload): void;
    log(payload: LogPayload): void;
}
//# sourceMappingURL=loggerServiceImpl.d.ts.map