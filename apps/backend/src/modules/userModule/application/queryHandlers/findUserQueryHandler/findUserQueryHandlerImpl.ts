import { Injectable, Inject } from '@libs/dependency-injection';
import { UserNotFoundError } from '../../errors/userNotFoundError.js';
import {
  FindUserQueryHandler,
  FindUserQueryHandlerPayload,
  FindUserQueryHandlerResult,
} from './findUserQueryHandler.js';
import { symbols } from '../../../symbols.js';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';

@Injectable()
export class FindUserQueryHandlerImpl implements FindUserQueryHandler {
  public constructor(
    @Inject(symbols.userRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(payload: FindUserQueryHandlerPayload): Promise<FindUserQueryHandlerResult> {
    const { userId } = payload;

    const user = await this.userRepository.findUser({ id: userId });

    if (!user) {
      throw new UserNotFoundError({ id: userId });
    }

    return { user };
  }
}
