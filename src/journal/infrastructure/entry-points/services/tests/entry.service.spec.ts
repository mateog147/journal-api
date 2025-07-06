import { Test, TestingModule } from '@nestjs/testing';
import { EntryService } from '../entry.service';
import {
  CreateEntryUseCase,
  GetEntriesByDateUseCase,
  UpdateEntryUseCase,
  DeleteEntryUseCase,
  GetEntryByIdUseCase,
} from '../../../../application/use-cases';

describe('EntryService', () => {
  let service: EntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        {
          provide: CreateEntryUseCase,
          useValue: {},
        },
        {
          provide: GetEntriesByDateUseCase,
          useValue: {},
        },
        {
          provide: UpdateEntryUseCase,
          useValue: {},
        },
        {
          provide: DeleteEntryUseCase,
          useValue: {},
        },
        {
          provide: GetEntryByIdUseCase,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});