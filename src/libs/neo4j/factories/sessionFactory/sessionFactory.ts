import { Session } from 'neo4j-driver';

export interface SessionFactory {
  create(): Session;
}
