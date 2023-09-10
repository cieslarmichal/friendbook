import 'reflect-metadata';

import { beforeEach, afterAll, expect } from 'vitest';
import { Application } from '../../../../../application.js';
import { userSymbols } from '../../../symbols.js';
import { UserEntityTestFactory } from '../../../tests/factories/userEntityTestFactory/userEntityTestFactory.js';
import { UserNotFoundError } from '../../errors/userNotFoundError.js';
import { DeleteUserCommandHandler } from './deleteUserCommandHandler.js';
import { symbols } from '@libs/logger';

describe('DeleteUserCommandHandler', () => {
  let deleteUserCommandHandler: DeleteUserCommandHandler;
  let userRepositoryFactory: UserRepositoryFactory;
  let testTransactionRunner: TestTransactionInternalRunner;
  let dataSource: DataSource;

  const userEntityTestFactory = new UserEntityTestFactory();

  beforeEach(async () => {
    const container = Application.createContainer();

    deleteUserCommandHandler = container.get<DeleteUserCommandHandler>(symbols.deleteUserCommandHandler);
    userRepositoryFactory = container.get<UserRepositoryFactory>(userSymbols.userRepositoryFactory);
    dataSource = container.get<DataSource>(postgresModuleSymbols.dataSource);

    await dataSource.initialize();

    testTransactionRunner = new TestTransactionInternalRunner(container);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('deletes user from database', async () => {
    expect.assertions(1);

    await testTransactionRunner.runInTestTransaction(async (unitOfWork) => {
      const entityManager = unitOfWork.getEntityManager();

      const userRepository = userRepositoryFactory.create(entityManager);

      const { id, email, password } = userEntityTestFactory.create();

      const user = await userRepository.createUser({
        id,
        email: email as string,
        password,
      });

      await deleteUserCommandHandler.execute({ unitOfWork, userId: user.id });

      const foundUser = await userRepository.findUser({ id: user.id });

      expect(foundUser).toBeNull();
    });
  });

  it('should throw if user with given id does not exist', async () => {
    expect.assertions(1);

    await testTransactionRunner.runInTestTransaction(async (unitOfWork) => {
      const { id } = userEntityTestFactory.create();

      try {
        await deleteUserCommandHandler.execute({ unitOfWork, userId: id });
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundError);
      }
    });
  });
});
