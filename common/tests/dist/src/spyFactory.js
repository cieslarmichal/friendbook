export class SpyFactory {
    vitest;
    constructor(vitest) {
        this.vitest = vitest;
    }
    create(obj, methodName) {
        const dummy = (() => { });
        obj[methodName] = dummy;
        return this.vitest.spyOn(obj, methodName);
    }
}
