import { describe, it, beforeEach, expect } from 'vitest';

import { LoggerModule } from './loggerModule.js';
import { loggerSymbols } from './symbols.js';
import { LoggerService } from './services/loggerService/loggerService.js';
import { LoggerServiceImpl } from './services/loggerService/loggerServiceImpl.js';
import { LoggerModuleConfigTestFactory } from './tests/factories/loggerModuleConfigTestFactory/loggerModuleConfigTestFactory.js';
import { DependencyInjectionContainer, DependencyInjectionContainerFactory } from '@libs/dependency-injection';

describe('LoggerModule', () => {
  let container: DependencyInjectionContainer;

  const loggerModuleConfig = new LoggerModuleConfigTestFactory().create();

  beforeEach(async () => {
    container = DependencyInjectionContainerFactory.create({
      modules: [new LoggerModule(loggerModuleConfig)],
    });
  });

  it('declares bindings', async () => {
    expect(container.get<LoggerService>(loggerSymbols.loggerService)).toBeInstanceOf(LoggerServiceImpl);
  });
});
