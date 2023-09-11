import { beforeEach, afterAll, expect, describe, it } from 'vitest';
import { Application } from '../../../../../application.js';
import { symbols, userSymbols } from '../../../symbols.js';
import { UserRawEntityTestFactory } from '../../../tests/factories/userRawEntityTestFactory/userRawEntityTestFactory.js';
import { UserNotFoundError } from '../../errors/userNotFoundError.js';
import { HashService } from '../../services/hashService/hashService.js';
import { TokenService } from '../../services/tokenService/tokenService.js';
import { LoginUserCommandHandler } from './loginUserCommandHandler.js';
import { Session, neo4jSymbols } from '@libs/neo4j';
import { UserRepository } from '../../repositories/userRepository/userRepository.js';

describe('LoginUserCommandHandler', () => {
  let loginUserCommandHandler: LoginUserCommandHandler;
  let userRepository: UserRepository;
  let tokenService: TokenService;
  let hashService: HashService;
  let session: Session;

  const userEntityTestFactory = new UserRawEntityTestFactory();

  beforeEach(async () => {
    const container = Application.createContainer();

    loginUserCommandHandler = container.get<LoginUserCommandHandler>(symbols.loginUserCommandHandler);
    userRepository = container.get<UserRepository>(symbols.userRepository);
    tokenService = container.get<TokenService>(userSymbols.tokenService);
    hashService = container.get<HashService>(symbols.hashService);
    session = container.get<Session>(neo4jSymbols.session);
  });

  afterAll(async () => {
    await session.close();
  });

  it('returns access token', async () => {
    const { id, email, password } = userEntityTestFactory.create();

    const hashedPassword = await hashService.hash(password);

    const user = await userRepository.createUser({
      id,
      email: email as string,
      password: hashedPassword,
    });

    const { accessToken } = await loginUserCommandHandler.execute({
      email: email as string,
      password,
    });

    const data = tokenService.verifyToken(accessToken);

    expect(data['id']).toBe(user.id);
  });

  it('throws an error if user with given email does not exist', async () => {
    const { email, password } = userEntityTestFactory.create();

    try {
      await loginUserCommandHandler.execute({
        email: email as string,
        password,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);

      return;
    }

    expect.fail();
  });

  it('throws an error if user password does not match db password', async () => {
    const { id, email, password } = userEntityTestFactory.create();

    const { password: otherPassword } = userEntityTestFactory.create();

    await userRepository.createUser({
      id,
      email: email as string,
      password,
    });

    try {
      await loginUserCommandHandler.execute({
        email: email as string,
        password: otherPassword,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);

      return;
    }

    expect.fail();
  });
});
