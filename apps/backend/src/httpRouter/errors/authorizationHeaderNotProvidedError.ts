import { ApplicationError } from '@common/validation';

interface Context {
  readonly headers: Record<string, string>;
}

export class AuthorizationHeaderNotProvidedError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('AuthorizationHeaderNotProvidedError', 'Authorization header not provided.', context);
  }
}
