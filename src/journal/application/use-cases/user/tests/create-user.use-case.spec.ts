import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.use-case';
import { UserDb } from '../../../../domain/ports/user-db.interface';
import { IPasswordHash, IUser } from '../../../../domain/entities/user.interface';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let dbService: { createUser: jest.Mock };
  let passwordHash: { transform: jest.Mock };

  beforeEach(async () => {
    dbService = { createUser: jest.fn() };
    passwordHash = { transform: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: UserDb, useValue: dbService },
        { provide: 'IPasswordHash', useValue: passwordHash },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto = {
      password: 'password123',
      email: 'test@example.com',
      name: 'John',
      lastName: 'Doe',
      gender: 'Male',
      birthDay: '1990-01-01',
    };
    const transformedPassword = 'hashedPassword';
    const newUser: IUser = {
      userName: createUserDto.email,
      loginInfo: { password: transformedPassword },
      contactInfo: {
        email: createUserDto.email,
        name: createUserDto.name,
        lastName: createUserDto.lastName,
      },
      gender: createUserDto.gender,
      birthDay: new Date(createUserDto.birthDay),
    };

    passwordHash.transform.mockReturnValue(transformedPassword);
    dbService.createUser.mockResolvedValue(newUser);

    const result = await useCase.apply(createUserDto, passwordHash as IPasswordHash);

    expect(passwordHash.transform).toHaveBeenCalledWith(createUserDto.password);
    expect(dbService.createUser).toHaveBeenCalledWith(newUser);
    expect(result).toEqual(newUser);
  });
});