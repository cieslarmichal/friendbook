import { Injectable, Inject } from '@libs/dependency-injection';
import { LoggerService, loggerSymbols } from '@libs/logger';
import { UserAlreadyExistsError } from '../../errors/userAlreadyExistsError.js';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';
import { HashService } from '../../services/hashService/hashService.js';
import {
  RegisterUserCommandHandler,
  RegisterUserCommandHandlerPayload,
  RegisterUserCommandHandlerResult,
} from './registerUserCommandHandler.js';
import { symbols } from '../../../symbols.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterUserCommandHandlerImpl implements RegisterUserCommandHandler {
  public constructor(
    @Inject(symbols.userRepository)
    private readonly userRepository: UserRepository,
    @Inject(symbols.hashService)
    private readonly hashService: HashService,
    @Inject(loggerSymbols.loggerService)
    private readonly loggerService: LoggerService,
  ) {}

  public async execute(payload: RegisterUserCommandHandlerPayload): Promise<RegisterUserCommandHandlerResult> {
    const { email, password } = payload;

    this.loggerService.debug({ message: 'Registering user...', context: { email } });

    const existingUser = await this.userRepository.findUser({ email });

    if (existingUser) {
      throw new UserAlreadyExistsError({ email });
    }

    const hashedPassword = await this.hashService.hash(password);

    const user = await this.userRepository.createUser({
      id: uuidv4(),
      email,
      password: hashedPassword,
    });

    this.loggerService.info({ message: 'User registered.', context: { email, userId: user.id } });

    return { user };
  }
}
