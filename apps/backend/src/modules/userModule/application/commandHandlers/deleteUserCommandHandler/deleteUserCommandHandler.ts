import { CommandHandler } from '@common/types';

export interface DeleteUserCommandHandlerPayload {
  readonly userId: string;
}

export type DeleteUserCommandHandler = CommandHandler<DeleteUserCommandHandlerPayload, void>;
