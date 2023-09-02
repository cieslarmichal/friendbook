import { Session } from 'neo4j-driver';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer';
import { DependencyInjectionModule } from '../dependencyInjection/dependencyInjectionModule';
import { Neo4jModuleConfig } from './neo4jModuleConfig';
import { symbols } from './symbols';
import { SessionFactoryImpl } from './factories/sessionFactory/sessionFactoryImpl';

export class Neo4jModule implements DependencyInjectionModule {
  public constructor(private readonly config: Neo4jModuleConfig) {}

  public declareBindings(container: DependencyInjectionContainer): void {
    container.bindToValue<Neo4jModuleConfig>(symbols.neo4jModuleConfig, this.config);

    container.bindToFactory<Session>(symbols.session, SessionFactoryImpl);
  }
}
