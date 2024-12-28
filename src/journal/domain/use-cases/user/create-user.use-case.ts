import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '../../model/user.interface';
import { UserDb, IUserDb } from '../../model/ports/user-db.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserDb)
    private readonly dbService: IUserDb,
  ) {}

  public async apply(newUser: IUser): Promise<IUser> {
    const user = await this.dbService.createUser(newUser);
    return user;
  }
}
