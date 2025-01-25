import { Inject, Injectable } from '@nestjs/common';
import { IPasswordHash, IUser } from '../../model/user.interface';
import { UserDb, IUserDb } from '../../model/ports/user-db.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserDb)
    private readonly dbService: IUserDb,
  ) {}

  public async apply(
    createUser: {
      password: string;
      email: string;
      name: string;
      lastName: string;
      gender: string;
      birthDay: string;
    },
    passwordHash: IPasswordHash,
  ): Promise<IUser> {
    const newUser: IUser = {
      userName: createUser.email,
      loginInfo: {
        password: passwordHash.transform(createUser.password),
      },
      contactInfo: {
        email: createUser.email,
        name: createUser.name,
        lastName: createUser.lastName,
      },
      gender: createUser.gender,
      birthDay: new Date(createUser.birthDay),
    };

    const user = await this.dbService.createUser(newUser);
    return user;
  }
}
