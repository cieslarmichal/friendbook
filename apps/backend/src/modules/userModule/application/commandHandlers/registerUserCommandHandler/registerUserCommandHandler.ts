import { CommandHandler } from '@common/types';
import { User } from '../../../domain/entities/user/user.js';

export interface RegisterUserCommandHandlerPayload {
  readonly email: string;
  readonly password: string;
}

export interface RegisterUserCommandHandlerResult {
  readonly user: User;
}

export type RegisterUserCommandHandler = CommandHandler<
  RegisterUserCommandHandlerPayload,
  RegisterUserCommandHandlerResult
>;
