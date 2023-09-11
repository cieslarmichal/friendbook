import { ApplicationError } from '@common/validation';

type Context = {
  readonly email: string;
};

export class UserAlreadyExistsError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('UserAlreadyExistsError', 'User already exists.', context);
  }
}
