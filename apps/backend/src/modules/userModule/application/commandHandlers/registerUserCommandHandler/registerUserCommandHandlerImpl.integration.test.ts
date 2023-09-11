import { beforeEach, afterAll, expect, describe, it } from 'vitest';
import { Application } from '../../../../../application.js';
import { symbols } from '../../../symbols.js';
import { UserRawEntityTestFactory } from '../../../tests/factories/userRawEntityTestFactory/userRawEntityTestFactory.js';
import { UserAlreadyExistsError } from '../../errors/userAlreadyExistsError.js';
import { RegisterUserCommandHandler } from './registerUserCommandHandler.js';
import { Session, neo4jSymbols } from '@libs/neo4j';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';

describe('RegisterUserCommandHandler', () => {
  let registerUserCommandHandler: RegisterUserCommandHandler;
  let userRepository: UserRepository;
  let session: Session;

  const userEntityTestFactory = new UserRawEntityTestFactory();

  beforeEach(async () => {
    const container = Application.createContainer();

    registerUserCommandHandler = container.get<RegisterUserCommandHandler>(symbols.registerUserCommandHandler);
    userRepository = container.get<UserRepository>(symbols.userRepository);
    session = container.get<Session>(neo4jSymbols.session);
  });

  afterAll(async () => {
    await session.close();
  });

  it('creates user in database', async () => {
    const { email, password } = userEntityTestFactory.create();

    const { user } = await registerUserCommandHandler.execute({
      email: email as string,
      password,
    });

    const foundUser = await userRepository.findUser({ id: user.id });

    expect(foundUser).not.toBeNull();
  });

  it('should not create user and throw if user with the same email already exists', async () => {
    const { id, email, password } = userEntityTestFactory.create();

    await userRepository.createUser({
      id,
      email: email as string,
      password,
    });

    try {
      await registerUserCommandHandler.execute({
        email: email as string,
        password,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UserAlreadyExistsError);

      return;
    }

    expect.fail();
  });
});
