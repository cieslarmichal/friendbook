import { User } from '../../../domain/entities/user/user.js';

export interface CreateUserPayload {
  id: string;
  email: string;
  password: string;
}

export interface FindUserPayload {
  id?: string;
  email?: string;
}

export interface UpdateUserPayload {
  id: string;
  password: string;
}

export interface DeleteUserPayload {
  id: string;
  password?: string;
}

export interface UserRepository {
  createUser(input: CreateUserPayload): Promise<User>;
  findUser(input: FindUserPayload): Promise<User | null>;
  updateUser(input: UpdateUserPayload): Promise<User>;
  deleteUser(input: DeleteUserPayload): Promise<void>;
}
