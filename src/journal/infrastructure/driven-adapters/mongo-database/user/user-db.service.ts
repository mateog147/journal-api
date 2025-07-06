import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { IUserDb, IUser } from '../../../../domain';

@Injectable()
export class UserDbService implements IUserDb {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: IUser): Promise<IUser> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  updateUserById: (user: Partial<IUser>) => Promise<IUser>;

  async getUserByemail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ userName: email }).exec();
  }

  async getUserById(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }
}
