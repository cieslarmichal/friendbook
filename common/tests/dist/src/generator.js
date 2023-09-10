import { faker } from '@faker-js/faker';
export class Generator {
    static uuid() {
        return faker.string.uuid();
    }
}
