import { Inject, Injectable } from '@nestjs/common';
import { EntryDb, IEntry, IEntryDb } from '../../../domain';

@Injectable()
export class CreateEntryUseCase {
  constructor(
    @Inject(EntryDb)
    private readonly dbService: IEntryDb,
  ) {}

  public async apply(newEntry: IEntry): Promise<IEntry> {
    const entry = await this.dbService.createEntry(newEntry);
    return entry;
  }
}
