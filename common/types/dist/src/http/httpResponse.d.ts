import { HttpStatusCode } from './httpStatusCode.js';
export declare const httpResponseSchema: import("zod").ZodObject<{
    statusCode: import("zod").ZodNativeEnum<typeof HttpStatusCode>;
    body: import("zod").ZodUnion<[import("zod").ZodNull, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>]>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    statusCode: HttpStatusCode;
    body: Record<string, any> | null;
}, {
    statusCode: HttpStatusCode;
    body: Record<string, any> | null;
}>;
export interface HttpResponse<Body = unknown> {
    readonly statusCode: HttpStatusCode;
    readonly body: Body;
}
export interface HttpOkResponse<Body = unknown> extends HttpResponse<Body> {
    readonly statusCode: typeof HttpStatusCode.ok;
}
export interface HttpCreatedResponse<Body = unknown> extends HttpResponse<Body> {
    readonly statusCode: typeof HttpStatusCode.created;
}
export interface HttpNoContentResponse<Body = unknown> extends HttpResponse<Body> {
    readonly statusCode: typeof HttpStatusCode.noContent;
}
export interface HttpNotFoundResponse<Body = unknown> extends HttpResponse<Body> {
    readonly statusCode: typeof HttpStatusCode.notFound;
}
export interface HttpBadRequestResponse<Body = unknown> extends HttpResponse<Body> {
    readonly statusCode: typeof HttpStatusCode.badRequest;
}
//# sourceMappingURL=httpResponse.d.ts.map