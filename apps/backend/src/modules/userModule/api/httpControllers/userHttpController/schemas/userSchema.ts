import { Schema } from '@common/validation';

export const userSchema = Schema.object({
  id: Schema.string(),
  email: Schema.string(),
});
