import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '../../model/user.interface';
import { UserDb, IUserDb } from '../../model/ports/user-db.interface';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(UserDb)
    private readonly dbService: IUserDb,
  ) {}

  public async apply(id: string): Promise<IUser> {
    const user = await this.dbService.getUserById(id);
    return user;
  }
}
