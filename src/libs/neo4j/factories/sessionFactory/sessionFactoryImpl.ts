import { SessionFactory } from './sessionFactory';
import { Inject, Injectable } from '../../../dependencyInjection/decorators';
import { Session, driver, auth } from 'neo4j-driver';
import { symbols } from '../../symbols';
import { Neo4jModuleConfig } from '../../neo4jModuleConfig';

@Injectable()
export class SessionFactoryImpl implements SessionFactory {
  public constructor(
    @Inject(symbols.neo4jModuleConfig)
    private readonly neo4jModuleConfig: Neo4jModuleConfig,
  ) {}

  public create(): Session {
    const { databaseHost, databaseUser, databasePassword } = this.neo4jModuleConfig;

    const neo4jDriver = driver(`neo4j://${databaseHost}`, auth.basic(databaseUser, databasePassword));

    return neo4jDriver.session();
  }
}
