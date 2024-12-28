import { Injectable } from '@nestjs/common';
import { IEntry } from 'src/journal/domain/model';
import {
  CreateEntryUseCase,
  GetEntriesByDateUseCase,
  UpdateEntryUseCase,
} from 'src/journal/domain/use-cases';
import {
  CreateEntryDto,
  GetEntriesByDateDto,
  UpdateEntryDto,
} from '../dto/entry.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EntryService {
  constructor(
    private createEntryUseCase: CreateEntryUseCase,
    private updateEntryUseCase: UpdateEntryUseCase,
    private getEntriesByDateUseCase: GetEntriesByDateUseCase,
  ) {}

  async createEntry(userId: string, data: CreateEntryDto): Promise<IEntry> {
    const id = uuidv4();
    const newEntry: IEntry = {
      id: id,
      userId: userId,
      title: data.title,
      content: data.content,
      createAt: new Date(),
      updateAt: new Date(),
    };

    return await this.createEntryUseCase.apply(newEntry);
  }

  async updateEntry(id: string, userId: string, data: UpdateEntryDto) {
    console.log('Start update entry for user id', userId);
    const res = await this.updateEntryUseCase.apply(id, data);
    return res;
  }

  getEntriesByDate(
    userId: string,
    params: GetEntriesByDateDto,
  ): Promise<IEntry[]> {
    const startDate = new Date(params.start);
    const endDate = new Date(params.end);
    const entries = this.getEntriesByDateUseCase.apply(
      userId,
      startDate,
      endDate,
    );
    return entries;
  }
}
