import 'reflect-metadata';

import { Session } from 'neo4j-driver';
import { describe, beforeAll, expect, it } from 'vitest';
import { DependencyInjectionContainer, DependencyInjectionContainerFactory } from '@libs/dependency-injection';
import { neo4jSymbols } from './symbols.js';
import { Neo4jModule } from './neo4jModule.js';
import { Neo4jModuleConfigTestFactory } from './tests/factories/neo4jModuleConfigTestFactory/neo4jModuleConfigTestFactory.js';

describe('Neo4jModule', () => {
  let container: DependencyInjectionContainer;

  const neo4jModuleConfig = new Neo4jModuleConfigTestFactory().create();

  beforeAll(async () => {
    container = DependencyInjectionContainerFactory.create({
      modules: [new Neo4jModule(neo4jModuleConfig)],
    });
  });

  it('declares bindings', async () => {
    expect(container.get<Session>(neo4jSymbols.session)).toBeInstanceOf(Session);
  });
});
