import { SpyInstance, vi } from 'vitest';
type Procedure = (...args: any[]) => any;
type Methods<T> = {
    [K in keyof T]: T[K] extends Procedure ? K : never;
}[keyof T] & (string | symbol);
export declare class SpyFactory {
    private readonly vitest;
    constructor(vitest: typeof vi);
    create<T, M extends Methods<Required<T>>>(obj: T, methodName: M): Required<T>[M] extends (new (...args: infer A) => infer R) | ((...args: infer A) => infer R) ? SpyInstance<A, R> : never;
}
export {};
//# sourceMappingURL=spyFactory.d.ts.map