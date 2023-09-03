import { Session } from '../../session.js';

export interface SessionFactory {
  create(): Session;
}
