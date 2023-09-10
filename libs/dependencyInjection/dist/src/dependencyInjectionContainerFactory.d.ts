import { DependencyInjectionContainer } from './dependencyInjectionContainer.js';
import { DependencyInjectionModule } from './dependencyInjectionModule.js';
export interface CreatePayload {
    modules: DependencyInjectionModule[];
}
export declare class DependencyInjectionContainerFactory {
    static create(payload: CreatePayload): DependencyInjectionContainer;
}
//# sourceMappingURL=dependencyInjectionContainerFactory.d.ts.map