import { AnyZodTuple, z, ZodFunction, ZodTuple, ZodType, ZodTypeAny } from 'zod';
export declare class Schema {
    static string(): z.ZodString;
    static literal(value: any): z.ZodLiteral<any>;
    static unknownObject(): z.ZodObject<Record<string, ZodTypeAny>, 'passthrough'>;
    static number(): z.ZodNumber;
    static boolean(): z.ZodBoolean;
    static symbol(): z.ZodSymbol;
    static date(): z.ZodDate;
    static enum<T extends z.EnumLike>(value: T): z.ZodNativeEnum<T>;
    static array<T extends ZodTypeAny>(type: T): z.ZodArray<T>;
    static undefined(): z.ZodUndefined;
    static null(): z.ZodNull;
    static record<K extends z.ZodString, T extends ZodTypeAny>(key: K, value: T): z.ZodRecord<K, T>;
    static void(): z.ZodVoid;
    static any(): z.ZodAny;
    static map<K extends ZodTypeAny = ZodTypeAny, V extends ZodTypeAny = ZodTypeAny>(key: K, value: V): z.ZodMap<K, V>;
    static unknown(): z.ZodUnknown;
    static object<T extends z.ZodRawShape>(schema: T): z.ZodObject<T>;
    static instanceof<T extends new (...args: any) => any>(ctor: T): ZodType<InstanceType<T>>;
    static custom<T>(check?: ((data: unknown) => any) | undefined): ZodType<T>;
    static function<A extends AnyZodTuple, R extends ZodTypeAny>(args: A, returns: R): ZodFunction<A, R>;
    static unsafeType<T>(): ZodType<T>;
    static union<T extends [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>(types: T): z.ZodUnion<T>;
    static promise<T extends ZodTypeAny>(value: T): z.ZodPromise<T>;
    static tuple<T extends [] | [ZodTypeAny, ...ZodTypeAny[]]>(types: T): ZodTuple<T>;
}
//# sourceMappingURL=schema.d.ts.map