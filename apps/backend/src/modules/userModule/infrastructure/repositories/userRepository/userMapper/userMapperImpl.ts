import { Injectable } from '@libs/dependency-injection';
import { User } from '../../../../domain/entities/user/user.js';
import { UserMapper } from './userMapper.js';
import { UserRawEntity } from '../userRawEntity/userRawEntity.js';

@Injectable()
export class UserMapperImpl implements UserMapper {
  public map(entity: UserRawEntity): User {
    const { id, email, password } = entity;

    return new User({
      id,
      email,
      password,
    });
  }
}
