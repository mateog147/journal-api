import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from 'src/journal/domain/model';
import {
  CreateUserUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
} from 'src/journal/domain/use-cases';
import { CreateUserDto, GetUserDto } from '../dto/user.dto';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private createUserUseCase: CreateUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async getuserDetail(queryDto: GetUserDto): Promise<IUser> {
    try {
      let user: IUser;
      console.log('getUserDEtail start');
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
      console.error(`getuserDetail error: ${error}`);
      throw error;
    }
  }
  getHello(): string {
    return 'Hello World from journal api!';
  }

  async createUser(data: CreateUserDto): Promise<IUser> {
    await this.validateUserRegisteredByEmail(data.email);
    const newUser: IUser = {
      userName: data.email,
      loginInfo: {
        password: this.hashPwd(data.password),
      },
      contactInfo: {
        email: data.email,
        name: data.name,
        lastName: data.lastName,
      },
      gender: data.gender,
      birthDay: new Date(data.birthDay),
    };

    return await this.createUserUseCase.apply(newUser);
  }

  async validateUserRegisteredByEmail(email: string) {
    const isUserRegister = await this.getUserByEmailUseCase.apply(email);
    if (isUserRegister) {
      throw new BadRequestException('Bad request info');
    }
  }

  hashPwd(password: string): string {
    const hash = createHash('sha224');
    hash.update(password);
    const pwdHash = hash.digest('hex');
    return pwdHash;
  }
}
