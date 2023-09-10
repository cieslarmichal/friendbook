import { HttpStatusCode } from './httpStatusCode.js';
import { Schema } from '@common/validation';
export const httpResponseSchema = Schema.object({
    statusCode: Schema.enum(HttpStatusCode),
    body: Schema.union([Schema.null(), Schema.record(Schema.string(), Schema.any())]),
});
