import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailUseCase } from '../get-user-by-email.use-case';
import { UserDb } from '../../../../domain/ports/user-db.interface';

describe('GetUserByEmailUseCase', () => {
  let useCase: GetUserByEmailUseCase;
  let dbService: { getUserByemail: jest.Mock };

  beforeEach(async () => {
    dbService = { getUserByemail: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByEmailUseCase,
        { provide: UserDb, useValue: dbService },
      ],
    }).compile();
    useCase = module.get<GetUserByEmailUseCase>(GetUserByEmailUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return user by email', async () => {
    const user = { id: '1', email: 'test@example.com' };
    dbService.getUserByemail.mockResolvedValue(user);
    const result = await useCase.apply('test@example.com');
    expect(dbService.getUserByemail).toHaveBeenCalledWith('test@example.com');
    expect(result).toEqual(user);
  });
});