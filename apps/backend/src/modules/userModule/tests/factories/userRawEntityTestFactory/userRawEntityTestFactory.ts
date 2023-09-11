import { faker } from '@faker-js/faker';
import { UserRawEntity } from '../../../infrastructure/repositories/userRepository/userRawEntity/userRawEntity.js';

export class UserRawEntityTestFactory {
  public create(input: Partial<UserRawEntity> = {}): UserRawEntity {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(24),
      ...input,
    };
  }
}
