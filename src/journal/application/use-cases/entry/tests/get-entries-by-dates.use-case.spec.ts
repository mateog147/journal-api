import { Test, TestingModule } from '@nestjs/testing';
import { GetEntriesByDateUseCase } from '../get-entries-by-dates.use-case';
import { EntryDb } from '../../../../domain/ports';

describe('GetEntriesByDateUseCase', () => {
  let useCase: GetEntriesByDateUseCase;
  let dbService: { getEntriesByUserAndDate: jest.Mock };

  beforeEach(async () => {
    dbService = { getEntriesByUserAndDate: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEntriesByDateUseCase,
        { provide: EntryDb, useValue: dbService },
      ],
    }).compile();
    useCase = module.get<GetEntriesByDateUseCase>(GetEntriesByDateUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call dbService.getEntriesByUserAndDate when apply is called', async () => {
    const entries = [{ id: '1' }];
    dbService.getEntriesByUserAndDate.mockResolvedValue(entries);
    const result = await useCase.apply('user1', new Date('2023-01-01'), new Date('2023-01-02'));
    expect(dbService.getEntriesByUserAndDate).toHaveBeenCalledWith('user1', new Date('2023-01-01'), new Date('2023-01-02'));
    expect(result).toBe(entries);
  });
});