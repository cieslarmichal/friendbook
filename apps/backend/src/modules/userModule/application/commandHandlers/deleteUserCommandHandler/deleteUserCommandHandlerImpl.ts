import { Injectable, Inject } from '@libs/dependency-injection';
import { LoggerService, loggerSymbols } from '@libs/logger';
import { DeleteUserCommandHandler, DeleteUserCommandHandlerPayload } from './deleteUserCommandHandler.js';
import { symbols } from '../../../symbols.js';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';

@Injectable()
export class DeleteUserCommandHandlerImpl implements DeleteUserCommandHandler {
  public constructor(
    @Inject(symbols.userRepository)
    private readonly userRepository: UserRepository,
    @Inject(loggerSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(payload: DeleteUserCommandHandlerPayload): Promise<void> {
    const { userId } = payload;

    this.loggerService.debug({ message: 'Deleting user...', context: { userId } });

    await this.userRepository.deleteUser({ id: userId });

    this.loggerService.info({ message: 'User deleted.', context: { userId } });
  }
}
