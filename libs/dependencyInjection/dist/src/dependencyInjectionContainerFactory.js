import { DependencyInjectionContainer } from './dependencyInjectionContainer.js';
export class DependencyInjectionContainerFactory {
    static create(payload) {
        const { modules } = payload;
        const container = new DependencyInjectionContainer();
        for (const module of modules) {
            module.declareBindings(container);
        }
        return container;
    }
}
