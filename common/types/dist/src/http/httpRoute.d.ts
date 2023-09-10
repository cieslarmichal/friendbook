import { HttpMethodName } from './httpMethodName.js';
import { HttpRequest } from './httpRequest.js';
import { HttpRouteHandler } from './httpRouteHandler.js';
import { SchemaObject, SchemaType } from '@common/validation';
declare const httpRouteSchemaSchema: import("zod").ZodObject<{
    request: import("zod").ZodObject<{
        body: import("zod").ZodOptional<import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>>;
        queryParams: import("zod").ZodOptional<import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>>;
        pathParams: import("zod").ZodOptional<import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>>;
    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
        body?: SchemaObject | undefined;
        queryParams?: SchemaObject | undefined;
        pathParams?: SchemaObject | undefined;
    }, {
        body?: SchemaObject | undefined;
        queryParams?: SchemaObject | undefined;
        pathParams?: SchemaObject | undefined;
    }>;
    response: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
        schema: import("zod").ZodUnion<[import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>, import("zod").ZodNull]>;
    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
        schema: SchemaObject | null;
    }, {
        schema: SchemaObject | null;
    }>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    request: {
        body?: SchemaObject | undefined;
        queryParams?: SchemaObject | undefined;
        pathParams?: SchemaObject | undefined;
    };
    response: Record<string, {
        schema: SchemaObject | null;
    }>;
}, {
    request: {
        body?: SchemaObject | undefined;
        queryParams?: SchemaObject | undefined;
        pathParams?: SchemaObject | undefined;
    };
    response: Record<string, {
        schema: SchemaObject | null;
    }>;
}>;
declare const httpRouteInputSchema: import("zod").ZodObject<{
    method: import("zod").ZodNativeEnum<typeof HttpMethodName>;
    path: import("zod").ZodOptional<import("zod").ZodString>;
    handler: import("zod").ZodFunction<import("zod").ZodTuple<[import("zod").ZodType<HttpRequest<any, any, any>, import("zod").ZodTypeDef, HttpRequest<any, any, any>>], null>, import("zod").ZodPromise<import("zod").ZodObject<{
        statusCode: import("zod").ZodNativeEnum<typeof import("./httpStatusCode.js").HttpStatusCode>;
        body: import("zod").ZodUnion<[import("zod").ZodNull, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>]>;
    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
        statusCode: import("./httpStatusCode.js").HttpStatusCode;
        body: Record<string, any> | null;
    }, {
        statusCode: import("./httpStatusCode.js").HttpStatusCode;
        body: Record<string, any> | null;
    }>>>;
    schema: import("zod").ZodObject<{
        request: import("zod").ZodObject<{
            body: import("zod").ZodOptional<import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>>;
            queryParams: import("zod").ZodOptional<import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>>;
            pathParams: import("zod").ZodOptional<import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>>;
        }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
            body?: SchemaObject | undefined;
            queryParams?: SchemaObject | undefined;
            pathParams?: SchemaObject | undefined;
        }, {
            body?: SchemaObject | undefined;
            queryParams?: SchemaObject | undefined;
            pathParams?: SchemaObject | undefined;
        }>;
        response: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
            schema: import("zod").ZodUnion<[import("zod").ZodType<SchemaObject, import("zod").ZodTypeDef, SchemaObject>, import("zod").ZodNull]>;
        }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
            schema: SchemaObject | null;
        }, {
            schema: SchemaObject | null;
        }>>;
    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
        request: {
            body?: SchemaObject | undefined;
            queryParams?: SchemaObject | undefined;
            pathParams?: SchemaObject | undefined;
        };
        response: Record<string, {
            schema: SchemaObject | null;
        }>;
    }, {
        request: {
            body?: SchemaObject | undefined;
            queryParams?: SchemaObject | undefined;
            pathParams?: SchemaObject | undefined;
        };
        response: Record<string, {
            schema: SchemaObject | null;
        }>;
    }>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    schema: {
        request: {
            body?: SchemaObject | undefined;
            queryParams?: SchemaObject | undefined;
            pathParams?: SchemaObject | undefined;
        };
        response: Record<string, {
            schema: SchemaObject | null;
        }>;
    };
    method: HttpMethodName;
    handler: (args_0: HttpRequest<any, any, any>) => Promise<{
        statusCode: import("./httpStatusCode.js").HttpStatusCode;
        body: Record<string, any> | null;
    }>;
    path?: string | undefined;
}, {
    schema: {
        request: {
            body?: SchemaObject | undefined;
            queryParams?: SchemaObject | undefined;
            pathParams?: SchemaObject | undefined;
        };
        response: Record<string, {
            schema: SchemaObject | null;
        }>;
    };
    method: HttpMethodName;
    handler: (args_0: HttpRequest<any, any, any>) => Promise<{
        statusCode: import("./httpStatusCode.js").HttpStatusCode;
        body: Record<string, any> | null;
    }>;
    path?: string | undefined;
}>;
export type HttpRouteInput = SchemaType<typeof httpRouteInputSchema>;
export declare class HttpRoute {
    readonly method: HttpMethodName;
    readonly path: string;
    readonly handler: HttpRouteHandler;
    readonly schema: SchemaType<typeof httpRouteSchemaSchema>;
    constructor(input: HttpRouteInput);
}
export {};
//# sourceMappingURL=httpRoute.d.ts.map