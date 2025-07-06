import { Test, TestingModule } from '@nestjs/testing';
import { ValidateUserPasswordUseCase } from '../validate-user-password.use-case';
import { UserDb } from '../../../../domain/ports/user-db.interface';
import { IPasswordHash } from '../../../../domain/entities/user.interface';

describe('ValidateUserPasswordUseCase', () => {
  let useCase: ValidateUserPasswordUseCase;
  let dbService: { getUserByemail: jest.Mock };
  let passwordHash: { transform: jest.Mock };

  beforeEach(async () => {
    dbService = { getUserByemail: jest.fn() };
    passwordHash = { transform: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateUserPasswordUseCase,
        { provide: UserDb, useValue: dbService },
        { provide: 'IPasswordHash', useValue: passwordHash },
      ],
    }).compile();

    useCase = module.get<ValidateUserPasswordUseCase>(ValidateUserPasswordUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return user if password is valid', async () => {
    const user = { loginInfo: { password: 'hashedPassword' } };
    dbService.getUserByemail.mockResolvedValue(user);
    passwordHash.transform.mockReturnValue('hashedPassword');

    const result = await useCase.apply('test@example.com', 'password123', passwordHash as IPasswordHash);

    expect(dbService.getUserByemail).toHaveBeenCalledWith('test@example.com');
    expect(passwordHash.transform).toHaveBeenCalledWith('password123');
    expect(result).toEqual(user);
  });

  it('should return null if password is invalid', async () => {
    const user = { loginInfo: { password: 'hashedPassword' } };
    dbService.getUserByemail.mockResolvedValue(user);
    passwordHash.transform.mockReturnValue('wrongPassword');

    const result = await useCase.apply('test@example.com', 'password123', passwordHash as IPasswordHash);

    expect(dbService.getUserByemail).toHaveBeenCalledWith('test@example.com');
    expect(passwordHash.transform).toHaveBeenCalledWith('password123');
    expect(result).toBeNull();
  });
});