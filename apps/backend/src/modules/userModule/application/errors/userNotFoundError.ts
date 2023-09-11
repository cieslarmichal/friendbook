import { ApplicationError } from '@common/validation';

type UserNotFoundIdContext = {
  readonly id: string;
};

type UserNotFoundEmailContext = {
  readonly email: string;
};

export class UserNotFoundError extends ApplicationError<UserNotFoundIdContext | UserNotFoundEmailContext> {
  public constructor(context: UserNotFoundIdContext | UserNotFoundEmailContext) {
    super('UserNotFoundError', 'User not found.', context);
  }
}
