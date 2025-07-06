import { Inject, Injectable } from '@nestjs/common';
import { EntryDb, IEntryDb } from '../../../domain';

@Injectable()
export class DeleteEntryUseCase {
    constructor(
        @Inject(EntryDb)
        private readonly dbService: IEntryDb,
    ) { }

    public async apply(id: string): Promise<void> {
        await this.dbService.deleteEntryById(id);
    }
}