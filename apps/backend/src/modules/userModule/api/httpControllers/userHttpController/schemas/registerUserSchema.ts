import { Schema, SchemaType } from '@common/validation';
import { userSchema } from './userSchema.js';

export const registerUserBodySchema = Schema.object({
  email: Schema.string(),
  password: Schema.string(),
});

export type RegisterUserBody = SchemaType<typeof registerUserBodySchema>;

export const registerUserResponseCreatedBodySchema = Schema.object({
  user: userSchema,
});

export type RegisterUserResponseCreatedBody = SchemaType<typeof registerUserResponseCreatedBodySchema>;
