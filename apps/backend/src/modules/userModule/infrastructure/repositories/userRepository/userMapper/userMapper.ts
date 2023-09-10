import { Mapper } from '@common/types';
import { User } from '../../../../domain/entities/user/user.js';
import { UserRawEntity } from '../userRawEntity/userRawEntity.js';

export type UserMapper = Mapper<UserRawEntity, User>;
