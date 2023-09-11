import { DependencyInjectionModule, DependencyInjectionContainer } from '@libs/dependency-injection';
import { UserHttpController } from './api/httpControllers/userHttpController/userHttpController.js';
import { DeleteUserCommandHandler } from './application/commandHandlers/deleteUserCommandHandler/deleteUserCommandHandler.js';
import { DeleteUserCommandHandlerImpl } from './application/commandHandlers/deleteUserCommandHandler/deleteUserCommandHandlerImpl.js';
import { LoginUserCommandHandler } from './application/commandHandlers/loginUserCommandHandler/loginUserCommandHandler.js';
import { LoginUserCommandHandlerImpl } from './application/commandHandlers/loginUserCommandHandler/loginUserCommandHandlerImpl.js';
import { RegisterUserCommandHandler } from './application/commandHandlers/registerUserCommandHandler/registerUserCommandHandler.js';
import { RegisterUserCommandHandlerImpl } from './application/commandHandlers/registerUserCommandHandler/registerUserCommandHandlerImpl.js';
import { FindUserQueryHandler } from './application/queryHandlers/findUserQueryHandler/findUserQueryHandler.js';
import { FindUserQueryHandlerImpl } from './application/queryHandlers/findUserQueryHandler/findUserQueryHandlerImpl.js';
import { UserRepository } from './application/repositories/userRepository/userRepository.js';
import { HashService } from './application/services/hashService/hashService.js';
import { HashServiceImpl } from './application/services/hashService/hashServiceImpl.js';
import { TokenService } from './application/services/tokenService/tokenService.js';
import { TokenServiceImpl } from './application/services/tokenService/tokenServiceImpl.js';
import { UserMapper } from './infrastructure/repositories/userRepository/userMapper/userMapper.js';
import { UserMapperImpl } from './infrastructure/repositories/userRepository/userMapper/userMapperImpl.js';
import { UserRepositoryImpl } from './infrastructure/repositories/userRepository/userRepositoryImpl.js';
import { symbols } from './symbols.js';
import { UserModuleConfig } from './userModuleConfig.js';

export class UserModule implements DependencyInjectionModule {
  public constructor(private readonly config: UserModuleConfig) {}

  public declareBindings(container: DependencyInjectionContainer): void {
    container.bindToValue<UserModuleConfig>(symbols.userModuleConfig, this.config);

    container.bindToConstructor<UserMapper>(symbols.userMapper, UserMapperImpl);

    container.bindToConstructor<UserRepository>(symbols.userRepository, UserRepositoryImpl);

    container.bindToConstructor<RegisterUserCommandHandler>(
      symbols.registerUserCommandHandler,
      RegisterUserCommandHandlerImpl,
    );

    container.bindToConstructor<LoginUserCommandHandler>(symbols.loginUserCommandHandler, LoginUserCommandHandlerImpl);

    container.bindToConstructor<DeleteUserCommandHandler>(
      symbols.deleteUserCommandHandler,
      DeleteUserCommandHandlerImpl,
    );

    container.bindToConstructor<FindUserQueryHandler>(symbols.findUserQueryHandler, FindUserQueryHandlerImpl);

    container.bindToConstructor<HashService>(symbols.hashService, HashServiceImpl);

    container.bindToConstructor<TokenService>(symbols.tokenService, TokenServiceImpl);

    container.bindToConstructor<UserHttpController>(symbols.userHttpController, UserHttpController);
  }
}
