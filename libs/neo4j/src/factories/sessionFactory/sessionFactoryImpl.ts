import { driver, auth } from 'neo4j-driver';
import { Neo4jModuleConfig } from '../../neo4jModuleConfig.js';
import { symbols } from '../../symbols.js';
import { SessionFactory } from './sessionFactory.js';
import { Session } from '../../session.js';

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
