import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntry, IEntryDb } from '../../../domain';

@Injectable()
export class EntryDbService implements IEntryDb {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) { }


  async createEntry(user: IEntry): Promise<Entry> {
    return await this.entryRepository.save(user).catch((error: any) => {
      console.log('create entry Db Error', error);
      throw new InternalServerErrorException('Error');
    });
  }

  async updateEntryById(id: string, entry: Partial<Entry>) {
    return this.entryRepository
      .update({ id }, { ...entry, updateAt: new Date() })
      .catch((error: any) => {
        throw new BadRequestException('Error', error);
      });
  }

  async getEntryById(id: string): Promise<IEntry | null> {
    return this.entryRepository.findOne({
      where: { id }
    });
  }

  async getEntriesByUserAndDate(
    userId: string,
    startDateTime: Date,
    endDateTime: Date,
  ): Promise<IEntry[]> {
    const entries = await this.entryRepository.find({
      where: {
        createAt: Between(startDateTime, endDateTime),
        userId: userId,
      },
    });

    return entries;
  }

  async deleteEntryById(id: string): Promise<void> {
    await this.entryRepository.delete({ id }).catch((error) => {
      throw new BadRequestException('Failed to delete entry', error);
    });
  }
}
