import { LogLevel } from '../../../logLevel.js';
export class LoggerModuleConfigTestFactory {
    create(input = {}) {
        return {
            logLevel: LogLevel.debug,
            ...input,
        };
    }
}
