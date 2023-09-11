import { ApplicationError } from '@common/validation';

interface Context {
  readonly headers: Record<string, string>;
}

export class BearerTokenNotProvidedError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('BearerTokenNotProvidedError', 'Bearer token not provided.', context);
  }
}
