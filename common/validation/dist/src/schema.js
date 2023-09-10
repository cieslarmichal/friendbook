import { z } from 'zod';
export class Schema {
    static string() {
        return z.string();
    }
    static literal(value) {
        return z.literal(value);
    }
    static unknownObject() {
        return z.object({}).passthrough();
    }
    static number() {
        return z.number();
    }
    static boolean() {
        return z.boolean();
    }
    static symbol() {
        return z.symbol();
    }
    static date() {
        return z.date();
    }
    static enum(value) {
        return z.nativeEnum(value);
    }
    static array(type) {
        return z.array(type);
    }
    static undefined() {
        return z.undefined();
    }
    static null() {
        return z.null();
    }
    static record(key, value) {
        return z.record(key, value);
    }
    static void() {
        return z.void();
    }
    static any() {
        return z.any();
    }
    static map(key, value) {
        return z.map(key, value);
    }
    static unknown() {
        return z.unknown();
    }
    static object(schema) {
        return z.object(schema);
    }
    static instanceof(ctor) {
        return z.instanceof(ctor);
    }
    static custom(check) {
        return z.custom(check);
    }
    static function(args, returns) {
        return z.function(args, returns);
    }
    static unsafeType() {
        return z.any();
    }
    static union(types) {
        return z.union(types);
    }
    static promise(value) {
        return z.promise(value);
    }
    static tuple(types) {
        return z.tuple(types);
    }
}
