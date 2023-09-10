import 'reflect-metadata';

import { UserEntityTestFactory } from '../../../../tests/factories/userEntityTestFactory/userEntityTestFactory.js';
import { UserMapperImpl } from './userMapperImpl.js';
import { describe, beforeEach, expect, it } from 'vitest';

describe('UserMapperImpl', () => {
  let userMapperImpl: UserMapperImpl;

  const userEntityTestFactory = new UserEntityTestFactory();

  beforeEach(async () => {
    userMapperImpl = new UserMapperImpl();
  });

  it('maps a user entity to a user', async () => {
    expect.assertions(1);

    const userEntity = userEntityTestFactory.create();

    const user = userMapperImpl.map(userEntity);

    expect(user).toEqual({
      id: userEntity.id,
      email: userEntity.email,
      phoneNumber: userEntity.phoneNumber,
      password: userEntity.password,
    });
  });
});
