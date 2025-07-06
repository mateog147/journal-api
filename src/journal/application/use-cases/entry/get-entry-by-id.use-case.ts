import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntryDb, IEntry, IEntryDb } from '../../../domain';

@Injectable()
export class GetEntryByIdUseCase {
    constructor(
        @Inject(EntryDb)
        private readonly dbService: IEntryDb,
    ) { }

    public async apply(id: string): Promise<IEntry> {
        const entry = await this.dbService.getEntryById(id);
        if (!entry) throw new NotFoundException('Entry not found');
        return entry;
    }
}