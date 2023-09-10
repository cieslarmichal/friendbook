import { Schema, SchemaType } from '@common/validation';

export const deleteUserPathParametersSchema = Schema.object({
  id: Schema.string(),
});

export type DeleteUserPathParameters = SchemaType<typeof deleteUserPathParametersSchema>;

export const deleteUserResponseNoContentBodySchema = Schema.null();

export type DeleteUserResponseNoContentBody = SchemaType<typeof deleteUserResponseNoContentBodySchema>;
