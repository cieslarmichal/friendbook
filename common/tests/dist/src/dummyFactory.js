export class DummyFactory {
    create() {
        const proxy = new Proxy({}, {
            get(target, property) {
                if (!target[property]) {
                    target[property] = () => { };
                }
                return target[property];
            },
        });
        return proxy;
    }
}
