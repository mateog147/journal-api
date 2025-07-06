import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByIdUseCase } from '../get-user-by-id.use-case';
import { UserDb } from '../../../../domain/ports/user-db.interface';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;
  let dbService: { getUserById: jest.Mock };

  beforeEach(async () => {
    dbService = { getUserById: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdUseCase,
        { provide: UserDb, useValue: dbService },
      ],
    }).compile();
    useCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return user by id', async () => {
    const user = { id: '1', email: 'test@example.com' };
    dbService.getUserById.mockResolvedValue(user);
    const result = await useCase.apply('1');
    expect(dbService.getUserById).toHaveBeenCalledWith('1');
    expect(result).toEqual(user);
  });
});