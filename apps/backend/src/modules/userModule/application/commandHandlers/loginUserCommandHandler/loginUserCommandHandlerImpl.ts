import { Injectable, Inject } from '@libs/dependency-injection';
import { LoggerService, loggerSymbols } from '@libs/logger';
import { UserNotFoundError } from '../../errors/userNotFoundError.js';
import { HashService } from '../../services/hashService/hashService.js';
import { TokenService } from '../../services/tokenService/tokenService.js';
import {
  LoginUserCommandHandler,
  LoginUserCommandHandlerPayload,
  LoginUserCommandHandlerResult,
} from './loginUserCommandHandler.js';
import { symbols } from '../../../symbols.js';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';

@Injectable()
export class LoginUserCommandHandlerImpl implements LoginUserCommandHandler {
  public constructor(
    @Inject(symbols.userRepository)
    private readonly userRepository: UserRepository,
    @Inject(loggerSymbols.loggerService)
    private readonly loggerService: LoggerService,
    @Inject(symbols.hashService)
    private readonly hashService: HashService,
    @Inject(symbols.tokenService)
    private readonly tokenService: TokenService,
  ) {}

  public async execute(payload: LoginUserCommandHandlerPayload): Promise<LoginUserCommandHandlerResult> {
    const { email, password } = payload;

    this.loggerService.debug({ message: 'Logging user in...', context: { email } });

    const user = await this.userRepository.findUser({ email });

    if (!user) {
      throw new UserNotFoundError({ email });
    }

    const passwordIsValid = await this.hashService.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UserNotFoundError({ email });
    }

    const accessToken = this.tokenService.createToken({ id: user.id });

    this.loggerService.info({ message: 'User logged in.', context: { email, userId: user.id, accessToken } });

    return { accessToken };
  }
}
