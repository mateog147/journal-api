import { Test, TestingModule } from '@nestjs/testing';
import { GetEntryByIdUseCase } from '../get-entry-by-id.use-case';
import { EntryDb } from '../../../../domain/ports';
import { NotFoundException } from '@nestjs/common';

describe('GetEntryByIdUseCase', () => {
  let useCase: GetEntryByIdUseCase;
  let dbService: { getEntryById: jest.Mock };

  beforeEach(async () => {
    dbService = { getEntryById: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEntryByIdUseCase,
        { provide: EntryDb, useValue: dbService },
      ],
    }).compile();
    useCase = module.get<GetEntryByIdUseCase>(GetEntryByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return entry if found', async () => {
    const entry = { id: '1' };
    dbService.getEntryById.mockResolvedValue(entry);
    const result = await useCase.apply('1');
    expect(dbService.getEntryById).toHaveBeenCalledWith('1');
    expect(result).toBe(entry);
  });

  it('should throw NotFoundException if entry not found', async () => {
    dbService.getEntryById.mockResolvedValue(undefined);
    await expect(useCase.apply('2')).rejects.toThrow(NotFoundException);
  });
});