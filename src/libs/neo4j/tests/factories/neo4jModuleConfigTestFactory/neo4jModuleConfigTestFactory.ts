import { Neo4jModuleConfig } from '../../../neo4jModuleConfig';

export class Neo4jModuleConfigTestFactory {
  public create(input: Partial<Neo4jModuleConfig> = {}): Neo4jModuleConfig {
    return {
      databaseHost: 'localhost',
      databaseUser: 'neo4j',
      databasePassword: 'neo4j',
      ...input,
    };
  }
}
