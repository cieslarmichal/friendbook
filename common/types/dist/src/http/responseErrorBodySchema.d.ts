import { SchemaType } from '@common/validation';
export declare const responseErrorBodySchema: import("zod").ZodObject<{
    error: import("zod").ZodObject<{
        name: import("zod").ZodString;
        message: import("zod").ZodString;
        context: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
    }, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
        message: string;
        name: string;
        context?: Record<string, any> | undefined;
    }, {
        message: string;
        name: string;
        context?: Record<string, any> | undefined;
    }>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    error: {
        message: string;
        name: string;
        context?: Record<string, any> | undefined;
    };
}, {
    error: {
        message: string;
        name: string;
        context?: Record<string, any> | undefined;
    };
}>;
export type ResponseErrorBody = SchemaType<typeof responseErrorBodySchema>;
//# sourceMappingURL=responseErrorBodySchema.d.ts.map