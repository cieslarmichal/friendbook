import { Container } from 'inversify';
export class DependencyInjectionContainer {
    instance;
    constructor() {
        this.instance = new Container({ autoBindInjectable: false, defaultScope: 'Singleton' });
    }
    resolve(constructor) {
        return this.instance.resolve(constructor);
    }
    bindToValue(symbol, value) {
        this.instance.bind(symbol).toConstantValue(value);
        return this;
    }
    bindToConstructor(symbol, constructor) {
        this.instance.bind(symbol).to(constructor);
        return this;
    }
    bindToFactory(symbol, factoryConstructor) {
        this.instance.bind(symbol).toDynamicValue(({ container }) => {
            const factory = container.resolve(factoryConstructor);
            return factory.create();
        });
        return this;
    }
    bindToDynamicValue(symbol, dynamicValue) {
        this.instance.bind(symbol).toDynamicValue(dynamicValue);
        return this;
    }
    getAsync(symbol) {
        return this.instance.getAsync(symbol);
    }
    get(symbol) {
        return this.instance.get(symbol);
    }
}
