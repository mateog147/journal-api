import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEntryUseCase } from '../delete-entry.use-case';
import { EntryDb } from '../../../../domain/ports';

describe('DeleteEntryUseCase', () => {
  let useCase: DeleteEntryUseCase;
  let dbService: { deleteEntryById: jest.Mock };

  beforeEach(async () => {
    dbService = { deleteEntryById: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteEntryUseCase,
        { provide: EntryDb, useValue: dbService },
      ],
    }).compile();
    useCase = module.get<DeleteEntryUseCase>(DeleteEntryUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call dbService.deleteEntryById when apply is called', async () => {
    dbService.deleteEntryById.mockResolvedValue(undefined);
    await useCase.apply('1');
    expect(dbService.deleteEntryById).toHaveBeenCalledWith('1');
  });
});