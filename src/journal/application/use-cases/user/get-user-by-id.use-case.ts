import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '../../../domain/entities/user.interface';
import { UserDb, IUserDb } from '../../../domain/ports/user-db.interface';

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
