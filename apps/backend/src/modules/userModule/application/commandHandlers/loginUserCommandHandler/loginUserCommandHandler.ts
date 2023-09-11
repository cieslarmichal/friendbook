import { CommandHandler } from '@common/types';

export interface LoginUserCommandHandlerPayload {
  readonly email: string;
  readonly password: string;
}

export interface LoginUserCommandHandlerResult {
  readonly accessToken: string;
}

export type LoginUserCommandHandler = CommandHandler<LoginUserCommandHandlerPayload, LoginUserCommandHandlerResult>;
