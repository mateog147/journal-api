import { Test, TestingModule } from '@nestjs/testing';
import { CreateEntryUseCase } from '../create-entry.use-case';
import { EntryDb } from '../../../../domain/ports';
import { IEntry } from 'src/journal/domain';

describe('CreateEntryUseCase', () => {
  let useCase: CreateEntryUseCase;
  let dbService: { createEntry: jest.Mock };

  beforeEach(async () => {
    dbService = { createEntry: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEntryUseCase,
        { provide: EntryDb, useValue: dbService },
      ],
    }).compile();
    useCase = module.get<CreateEntryUseCase>(CreateEntryUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call dbService.createEntry when apply is called', async () => {
    const entry: IEntry = {
      id: '1', title: 'Test', content: 'Content',
      createAt: new Date(),
      updateAt: new Date()
    };
    dbService.createEntry.mockResolvedValue(entry);
    const result = await useCase.apply(entry);
    expect(dbService.createEntry).toHaveBeenCalledWith(entry);
    expect(result).toBe(entry);
  });
});