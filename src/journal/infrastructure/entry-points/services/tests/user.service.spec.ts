import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import {
  GetUserByEmailUseCase,
  CreateUserUseCase,
  GetUserByIdUseCase,
} from '../../../../application/use-cases';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: GetUserByEmailUseCase,
          useValue: {},
        },
        {
          provide: CreateUserUseCase,
          useValue: {},
        },
        {
          provide: GetUserByIdUseCase,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});