import { faker } from '@faker-js/faker';

export class Generator {
  public static uuid(): string {
    return faker.string.uuid();
  }
}
