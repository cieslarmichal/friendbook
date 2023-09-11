import { beforeEach, afterAll, expect, describe, it } from 'vitest';
import { Application } from '../../../../../application.js';
import { symbols } from '../../../symbols.js';
import { UserRawEntityTestFactory } from '../../../tests/factories/userRawEntityTestFactory/userRawEntityTestFactory.js';
import { UserNotFoundError } from '../../errors/userNotFoundError.js';
import { DeleteUserCommandHandler } from './deleteUserCommandHandler.js';
import { Session, neo4jSymbols } from '@libs/neo4j';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';

describe('DeleteUserCommandHandler', () => {
  let deleteUserCommandHandler: DeleteUserCommandHandler;
  let userRepository: UserRepository;
  let session: Session;

  const userEntityTestFactory = new UserRawEntityTestFactory();

  beforeEach(async () => {
    const container = Application.createContainer();

    deleteUserCommandHandler = container.get<DeleteUserCommandHandler>(symbols.deleteUserCommandHandler);
    userRepository = container.get<UserRepository>(symbols.userRepository);
    session = container.get<Session>(neo4jSymbols.session);
  });

  afterAll(async () => {
    await session.close();
  });

  it('deletes user from database', async () => {
    const { id, email, password } = userEntityTestFactory.create();

    const user = await userRepository.createUser({
      id,
      email: email as string,
      password,
    });

    await deleteUserCommandHandler.execute({ userId: user.id });

    const foundUser = await userRepository.findUser({ id: user.id });

    expect(foundUser).toBeNull();
  });

  it('should throw if user with given id does not exist', async () => {
    const { id } = userEntityTestFactory.create();

    try {
      await deleteUserCommandHandler.execute({ userId: id });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);

      return;
    }

    expect.fail();
  });
});
