import { DependencyInjectionModule, DependencyInjectionContainer } from '@libs/dependency-injection';
import { Neo4jModuleConfig } from './neo4jModuleConfig.js';
export declare class Neo4jModule implements DependencyInjectionModule {
    private readonly config;
    constructor(config: Neo4jModuleConfig);
    declareBindings(container: DependencyInjectionContainer): void;
}
//# sourceMappingURL=neo4jModule.d.ts.map