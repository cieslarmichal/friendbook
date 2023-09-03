import { DependencyInjectionModule, DependencyInjectionContainer } from '@libs/dependency-injection';
import { SessionFactoryImpl } from './factories/sessionFactory/sessionFactoryImpl.js';
import { Neo4jModuleConfig } from './neo4jModuleConfig.js';
import { symbols } from './symbols.js';
import { Session } from './session.js';

export class Neo4jModule implements DependencyInjectionModule {
  public constructor(private readonly config: Neo4jModuleConfig) {}

  public declareBindings(container: DependencyInjectionContainer): void {
    container.bindToValue<Neo4jModuleConfig>(symbols.neo4jModuleConfig, this.config);

    container.bindToFactory<Session>(symbols.session, SessionFactoryImpl);
  }
}
