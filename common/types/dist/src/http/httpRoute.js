import { HttpMethodName } from './httpMethodName.js';
import { httpResponseSchema } from './httpResponse.js';
import { Schema, Validator } from '@common/validation';
const httpRouteSchemaSchema = Schema.object({
    request: Schema.object({
        body: Schema.unsafeType().optional(),
        queryParams: Schema.unsafeType().optional(),
        pathParams: Schema.unsafeType().optional(),
    }),
    response: Schema.record(Schema.string(), Schema.object({
        schema: Schema.union([Schema.unsafeType(), Schema.null()]),
    })),
});
const httpRouteInputSchema = Schema.object({
    method: Schema.enum(HttpMethodName),
    path: Schema.string().optional(),
    handler: Schema.function(Schema.tuple([Schema.unsafeType()]), Schema.promise(httpResponseSchema)),
    schema: httpRouteSchemaSchema,
});
export class HttpRoute {
    method;
    path;
    handler;
    schema;
    constructor(input) {
        const { method, path, handler, schema } = Validator.validate(httpRouteInputSchema, input);
        this.method = method;
        this.path = path ?? '';
        this.handler = handler;
        this.schema = schema;
    }
}
