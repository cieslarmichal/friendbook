import { Schema, SchemaType } from '@common/validation';
import { userSchema } from './userSchema.js';

export const findUserPathParametersSchema = Schema.object({
  id: Schema.string(),
});

export type FindUserPathParameters = SchemaType<typeof findUserPathParametersSchema>;

export const findUserResponseOkBodySchema = Schema.object({
  user: userSchema,
});

export type FindUserResponseOkBody = SchemaType<typeof findUserResponseOkBodySchema>;
