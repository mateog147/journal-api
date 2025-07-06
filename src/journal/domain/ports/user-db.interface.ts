import { IUser } from '../entities/user.interface';

export const UserDb = 'UserDb';

export interface IUserDb {
  getUserByemail: (email: string) => Promise<IUser>;
  getUserById: (id: string) => Promise<IUser>;
  createUser: (user: IUser) => Promise<IUser>;
  updateUserById: (user: Partial<IUser>) => Promise<IUser>;
}
