import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '../../model/user.interface';
import { UserDb, IUserDb } from '../../model/ports/user-db.interface';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(UserDb)
    private readonly dbService: IUserDb,
  ) {}

  public async apply(email: string): Promise<IUser> {
    const user = await this.dbService.getUserByemail(email);
    return user;
  }
}
