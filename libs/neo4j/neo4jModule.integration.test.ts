import 'reflect-metadata';

import { Application } from '../../application/application';
import { DependencyInjectionContainer } from '../dependencyInjection/dependencyInjectionContainer';
import { Session } from 'neo4j-driver';
import { neo4jSymbols } from './symbols';
import { describe, beforeAll, expect, it } from 'vitest';

describe('Neo4jModule', () => {
  let container: DependencyInjectionContainer;

  beforeAll(async () => {
    container = Application.createContainer();
  });

  it('declares bindings', async () => {
    expect(container.get<Session>(neo4jSymbols.session)).toBeInstanceOf(Session);
  });
});
