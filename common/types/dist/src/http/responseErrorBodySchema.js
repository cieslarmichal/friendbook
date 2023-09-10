import { Schema } from '@common/validation';
export const responseErrorBodySchema = Schema.object({
    error: Schema.object({
        name: Schema.string(),
        message: Schema.string(),
        context: Schema.record(Schema.string(), Schema.any()).optional(),
    }),
});
