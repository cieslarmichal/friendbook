import { DependencyInjectionContainer } from '@libs/dependency-injection';
import { beforeEach, expect, describe, it } from 'vitest';
import { Application } from '../../application.js';
import { UserHttpController } from './api/httpControllers/userHttpController/userHttpController.js';
import { TokenService } from './application/services/tokenService/tokenService.js';
import { TokenServiceImpl } from './application/services/tokenService/tokenServiceImpl.js';
import { userSymbols } from './symbols.js';

describe('UserModule', () => {
  let container: DependencyInjectionContainer;

  beforeEach(async () => {
    container = Application.createContainer();
  });

  it('declares bindings', async () => {
    expect(container.get<TokenService>(userSymbols.tokenService)).toBeInstanceOf(TokenServiceImpl);

    expect(container.get<UserHttpController>(userSymbols.userHttpController)).toBeInstanceOf(UserHttpController);
  });
});
