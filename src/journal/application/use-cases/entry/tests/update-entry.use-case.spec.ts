import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEntryUseCase } from '../update-entry.use-case';
import { EntryDb } from '../../../../domain/ports';

describe('UpdateEntryUseCase', () => {
  let useCase: UpdateEntryUseCase;
  let dbService: { updateEntryById: jest.Mock };

  beforeEach(async () => {
    dbService = { updateEntryById: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateEntryUseCase,
        { provide: EntryDb, useValue: dbService },
      ],
    }).compile();
    useCase = module.get<UpdateEntryUseCase>(UpdateEntryUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call dbService.updateEntryById when apply is called', async () => {
    const updated = { title: 'Updated' };
    const entry = { id: '1', ...updated };
    dbService.updateEntryById.mockResolvedValue(entry);
    const result = await useCase.apply('1', updated);
    expect(dbService.updateEntryById).toHaveBeenCalledWith('1', updated);
    expect(result).toBe(entry);
  });
});