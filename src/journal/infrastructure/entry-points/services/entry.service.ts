import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEntry } from '../../../domain/entities';
import {
  CreateEntryUseCase,
  GetEntriesByDateUseCase,
  UpdateEntryUseCase,
  DeleteEntryUseCase,
  GetEntryByIdUseCase,
} from '../../../../journal/application/use-cases';
import {
  CreateEntryDto,
  GetEntriesByDateDto,
  UpdateEntryDto,
} from '../dto/entry.dto';
import { v4 as uuidv4 } from 'uuid';
import { AppLogger } from '../../../../journal/shared/logger/app-logger';

@Injectable()
export class EntryService {
  constructor(
    private createEntryUseCase: CreateEntryUseCase,
    private updateEntryUseCase: UpdateEntryUseCase,
    private getEntriesByDateUseCase: GetEntriesByDateUseCase,
    private deleteEntryUseCase: DeleteEntryUseCase,
    private getEntryByIdUseCase: GetEntryByIdUseCase,
    private logger: AppLogger,
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

    this.logger.log('Creating entry', 'EntryService');
    return await this.createEntryUseCase.apply(newEntry);
  }

  async updateEntry(id: string, userId: string, data: UpdateEntryDto) {
    this.logger.log('Start update entry for user id ' + userId, 'EntryService');
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

  async deleteEntry(id: string, userId: string): Promise<void> {
    const entry = await this.getEntryByIdUseCase.apply(id);

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    if (entry.userId !== userId) {
      throw new ForbiddenException('You do not own this entry');
    }

    await this.deleteEntryUseCase.apply(id);
  }
}
