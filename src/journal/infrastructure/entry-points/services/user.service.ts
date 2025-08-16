import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IPasswordHash, IUser } from '../../../domain';
import {
  CreateUserUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
} from '../../../application/use-cases';
import { CreateUserDto, GetUserDto } from '../dto/user.dto';
import { PassportHasher } from '../auth';
import { AppLogger } from '../../../../journal/shared/logger/app-logger';

@Injectable()
export class UserService {
  private passwordHash: IPasswordHash;
  constructor(
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private createUserUseCase: CreateUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private logger: AppLogger,
  ) {
    this.passwordHash = new PassportHasher();
  }

  async getuserDetail(queryDto: GetUserDto): Promise<IUser> {
    try {
      let user: IUser;
      this.logger.log('getUserDDetail start', 'UserService');
      if (!queryDto.id && !queryDto.email) {
        throw new BadRequestException('No query criteria provided');
      }
      if (queryDto.email) {
        user = await this.getUserByEmailUseCase.apply(queryDto.email);
      } else if (queryDto.id) {
        user = await this.getUserByIdUseCase.apply(queryDto.id);
      }

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`getuserDetail error: ${error}`);
      throw error;
    }
  }

  async createUser(data: CreateUserDto): Promise<IUser> {
    await this.validateUserRegisteredByEmail(data.email);

    return await this.createUserUseCase.apply(data, this.passwordHash);
  }

  async validateUserRegisteredByEmail(email: string) {
    const isUserRegister = await this.getUserByEmailUseCase.apply(email);
    if (isUserRegister) {
      throw new BadRequestException('Bad request info');
    }
  }

  async getuserByid(id: any): Promise<IUser> {
    try {
      this.logger.log('getUser by id start', 'UserService');

      const user = await this.getUserByIdUseCase.apply(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`getuser by id error: ${error}`, 'UserService');
      throw error;
    }
  }
}
