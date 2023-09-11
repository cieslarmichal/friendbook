import { beforeEach, afterAll, expect, describe, it } from 'vitest';
import { Application } from '../../../../../application.js';
import { UserRawEntityTestFactory } from '../../../tests/factories/userRawEntityTestFactory/userRawEntityTestFactory.js';
import { UserNotFoundError } from '../../errors/userNotFoundError.js';
import { symbols } from '../../../symbols.js';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';
import { Session, neo4jSymbols } from '@libs/neo4j';
import { FindUserQueryHandler } from './findUserQueryHandler.js';

describe('FindUserQueryHandler', () => {
  let findUserQueryHandler: FindUserQueryHandler;
  let userRepository: UserRepository;
  let session: Session;

  const userEntityTestFactory = new UserRawEntityTestFactory();

  beforeEach(async () => {
    const container = Application.createContainer();

    findUserQueryHandler = container.get<FindUserQueryHandler>(symbols.findUserQueryHandler);
    userRepository = container.get<UserRepository>(symbols.userRepository);
    session = container.get<Session>(neo4jSymbols.session);
  });

  afterAll(async () => {
    await session.close();
  });

  it('finds user by id in database', async () => {
    const { id, email, password } = userEntityTestFactory.create();

    const user = await userRepository.createUser({
      id,
      email: email as string,
      password,
    });

    const { user: foundUser } = await findUserQueryHandler.execute({ userId: user.id });

    expect(foundUser).not.toBeNull();
  });

  it('should throw if user with given id does not exist in db', async () => {
    const { id } = userEntityTestFactory.create();

    try {
      await findUserQueryHandler.execute({ userId: id });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);

      return;
    }

    expect.fail();
  });
});
