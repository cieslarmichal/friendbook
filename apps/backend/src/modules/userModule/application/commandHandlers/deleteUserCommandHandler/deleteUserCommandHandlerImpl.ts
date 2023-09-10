import { Validator } from '@common/validation';
import { Injectable, Inject } from '@libs/dependency-injection';
import { symbols, LoggerService } from '@libs/logger';
import { DeleteUserCommandHandler, DeleteUserCommandHandlerPayload } from './deleteUserCommandHandler.js';

@Injectable()
export class DeleteUserCommandHandlerImpl implements DeleteUserCommandHandler {
  public constructor(
    @Inject(symbols.userRepositoryFactory)
    private readonly userRepositoryFactory: UserRepositoryFactory,
    @Inject(loggerModuleSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(input: DeleteUserCommandHandlerPayload): Promise<void> {
    const { unitOfWork, userId } = Validator.validate(deleteUserCommandHandlerPayloadSchema, input);

    this.loggerService.debug({ message: 'Deleting user...', context: { userId } });

    const entityManager = unitOfWork.getEntityManager();

    const userRepository = this.userRepositoryFactory.create(entityManager);

    await userRepository.deleteUser({ id: userId });

    this.loggerService.info({ message: 'User deleted.', context: { userId } });
  }
}
