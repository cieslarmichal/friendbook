import { LoggerModuleConfig } from './loggerModuleConfig.js';
import { DependencyInjectionModule, DependencyInjectionContainer } from '@libs/dependency-injection';
export declare class LoggerModule implements DependencyInjectionModule {
    private readonly config;
    constructor(config: LoggerModuleConfig);
    declareBindings(container: DependencyInjectionContainer): Promise<void>;
}
//# sourceMappingURL=loggerModule.d.ts.map