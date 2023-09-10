import { Neo4jModuleConfig } from '../../neo4jModuleConfig.js';
import { SessionFactory } from './sessionFactory.js';
import { Session } from '../../session.js';
export declare class SessionFactoryImpl implements SessionFactory {
    private readonly neo4jModuleConfig;
    constructor(neo4jModuleConfig: Neo4jModuleConfig);
    create(): Session;
}
//# sourceMappingURL=sessionFactoryImpl.d.ts.map