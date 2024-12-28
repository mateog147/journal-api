import { Inject, Injectable } from '@nestjs/common';
import { EntryDb, IEntry, IEntryDb } from '../../model';

@Injectable()
export class GetEntriesByDateUseCase {
  constructor(
    @Inject(EntryDb)
    private readonly dbService: IEntryDb,
  ) {}

  public async apply(
    userId: string,
    startDateTime: Date,
    endDateTime: Date,
  ): Promise<IEntry[]> {
    const entries = await this.dbService.getEntriesByUserAndDate(
      userId,
      startDateTime,
      endDateTime,
    );
    return entries;
  }
}
