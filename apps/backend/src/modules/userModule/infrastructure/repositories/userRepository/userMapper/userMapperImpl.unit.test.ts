import { UserRawEntityTestFactory } from '../../../../tests/factories/userRawEntityTestFactory/userRawEntityTestFactory.js';
import { UserMapperImpl } from './userMapperImpl.js';
import { describe, beforeEach, expect, it } from 'vitest';

describe('UserMapperImpl', () => {
  let userMapperImpl: UserMapperImpl;

  const userEntityTestFactory = new UserRawEntityTestFactory();

  beforeEach(async () => {
    userMapperImpl = new UserMapperImpl();
  });

  it('maps a user entity to a user', async () => {
    const userEntity = userEntityTestFactory.create();

    const user = userMapperImpl.map(userEntity);

    expect(user).toEqual({
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
    });
  });
});
