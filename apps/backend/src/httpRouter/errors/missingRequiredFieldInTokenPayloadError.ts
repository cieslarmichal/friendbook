import { ApplicationError } from '@common/validation';

interface Context {
  readonly requiredFieldName: string;
}

export class MissingRequiredFieldInTokenPayloadError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('MissingRequiredFieldInTokenPayloadError', 'Missing required field in token payload.', context);
  }
}
