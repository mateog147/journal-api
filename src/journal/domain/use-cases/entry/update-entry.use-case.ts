import { Inject, Injectable } from '@nestjs/common';
import { EntryDb, IEntry, IEntryDb } from '../../model';

@Injectable()
export class UpdateEntryUseCase {
  constructor(
    @Inject(EntryDb)
    private readonly dbService: IEntryDb,
  ) {}

  public async apply(
    id: string,
    updatedEntry: Partial<IEntry>,
  ): Promise<IEntry> {
    const res = await this.dbService.updateEntryById(id, updatedEntry);
    return res;
  }
}
