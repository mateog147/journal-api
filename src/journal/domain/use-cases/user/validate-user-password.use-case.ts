import { Inject, Injectable } from '@nestjs/common';
import { IPasswordHash, IUser } from '../../model/user.interface';
import { UserDb, IUserDb } from '../../model/ports/user-db.interface';

@Injectable()
export class ValidateUserPasswordUseCase {
  constructor(
    @Inject(UserDb)
    private readonly dbService: IUserDb,
  ) {}

  public async apply(
    email: string,
    inputPassword: string,
    passwordHash: IPasswordHash,
  ): Promise<IUser> {
    const user = await this.dbService.getUserByemail(email);
    if (user.loginInfo.password != passwordHash.transform(inputPassword)) {
      return null;
    }

    return user;
  }
}
