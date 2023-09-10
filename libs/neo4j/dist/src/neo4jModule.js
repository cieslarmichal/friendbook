import { SessionFactoryImpl } from './factories/sessionFactory/sessionFactoryImpl.js';
import { symbols } from './symbols.js';
export class Neo4jModule {
    config;
    constructor(config) {
        this.config = config;
    }
    declareBindings(container) {
        container.bindToValue(symbols.neo4jModuleConfig, this.config);
        container.bindToFactory(symbols.session, SessionFactoryImpl);
    }
}
