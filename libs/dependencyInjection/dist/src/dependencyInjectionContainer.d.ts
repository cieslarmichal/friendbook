import { interfaces } from 'inversify';
import { FactoryLike } from './factoryLike.js';
export declare class DependencyInjectionContainer {
    private instance;
    constructor();
    resolve<T>(constructor: interfaces.Newable<T>): T;
    bindToValue<T>(symbol: symbol, value: T): DependencyInjectionContainer;
    bindToConstructor<T>(symbol: symbol, constructor: interfaces.Newable<T>): DependencyInjectionContainer;
    bindToFactory<T>(symbol: symbol, factoryConstructor: interfaces.Newable<FactoryLike<T>>): DependencyInjectionContainer;
    bindToDynamicValue<T>(symbol: symbol, dynamicValue: interfaces.DynamicValue<T>): DependencyInjectionContainer;
    getAsync<T>(symbol: symbol): Promise<T>;
    get<T>(symbol: symbol): T;
}
//# sourceMappingURL=dependencyInjectionContainer.d.ts.map