import { Session } from '@libs/neo4j';
import {
  CreateUserPayload,
  DeleteUserPayload,
  FindUserPayload,
  UpdateUserPayload,
  UserRepository,
} from '../../../application/repositories/userRepository/userRepository.js';
import { Validator } from '@common/validation';
import { UserNotFoundError } from '../../../application/errors/userNotFoundError.js';
import { User } from '../../../domain/entities/user/user.js';
import { UserMapper } from './userMapper/userMapper.js';
import { UserRawEntity } from './userRawEntity/userRawEntity.js';

export class UserRepositoryImpl implements UserRepository {
  public constructor(
    private readonly session: Session,
    private readonly userMapper: UserMapper,
  ) {}

  public async createUser(payload: CreateUserPayload): Promise<User> {
    const { id, email, phoneNumber, password } = payload;

    return this.userMapper.map(savedUserEntity);
  }

  public async findUser(payload: FindUserPayload): Promise<User | null> {
    const { id, email } = payload;

    console.log({ id, email });

    const userRawEntity: UserRawEntity = { id: '123', email: '123', password: '123' };

    if (!userRawEntity) {
      return null;
    }

    return this.userMapper.map(userEntity);
  }

  public async updateUser(payload: UpdateUserPayload): Promise<User> {
    const { id, password } = payload;

    console.log({ password });

    const userRawEntity = await this.findUser({ id });

    if (!userRawEntity) {
      throw new UserNotFoundError({ id });
    }

    const updatedUserEntity = await this.findUser({ id });

    return updatedUserEntity as User;
  }

  public async deleteUser(payload: DeleteUserPayload): Promise<void> {
    const { id } = payload;

    const userEntity = await this.findUser({ id });

    if (!userEntity) {
      throw new UserNotFoundError({ id });
    }
  }
}
