import { Schema, SchemaType } from '@common/validation';

export const loginUserBodySchema = Schema.object({
  email: Schema.string(),
  password: Schema.string(),
});

export type LoginUserBody = SchemaType<typeof loginUserBodySchema>;

export const loginUserResponseOkBodySchema = Schema.object({
  token: Schema.string(),
});

export type LoginUserResponseOkBody = SchemaType<typeof loginUserResponseOkBodySchema>;
