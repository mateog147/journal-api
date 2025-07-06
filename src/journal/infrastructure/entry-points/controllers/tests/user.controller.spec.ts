import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, HttpException, InternalServerErrorException } from '@nestjs/common';
import { UserController } from '../user.controller';
import { UserService } from '../../services/user.service';
import { CreateUserDto, GetUserDto } from '../../dto/user.dto';
import { IUser } from '../../../../domain';
import { AuthGuard } from '../../auth';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockRequest = {
    user: {
      sub: 'test-user-id',
    },
  };

  const mockUser: IUser = {
    _id: 'test-user-id',
    userName: 'testuser',
    loginInfo: {
      password: 'hashedpassword',
    },
    contactInfo: {
      email: 'test@example.com',
      name: 'Test',
      lastName: 'User',
    },
    gender: 'male',
    birthDay: new Date('1990-01-01'),
  };

  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getuserDetail: jest.fn(),
            createUser: jest.fn(),
            getuserByid: jest.fn(),
          },
        },
      ],
    }).overrideGuard(AuthGuard)
      .useValue(mockTokenGuard).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserByEmail', () => {
    it('should call userService.getuserDetail with filter', async () => {
      const filter: GetUserDto = {
        email: 'test@example.com',
      };

      jest.spyOn(userService, 'getuserDetail').mockResolvedValue(mockUser);

      const result = await controller.getUserByEmail(filter, mockRequest);

      expect(userService.getuserDetail).toHaveBeenCalledWith(filter);
      expect(result).toEqual(mockUser);
    });

    it('should rethrow HttpException', async () => {
      const filter: GetUserDto = {
        email: 'test@example.com',
      };
      const httpException = new HttpException('Test error', 400);

      jest.spyOn(userService, 'getuserDetail').mockRejectedValue(httpException);

      await expect(controller.getUserByEmail(filter, mockRequest)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      const filter: GetUserDto = {
        email: 'test@example.com',
      };

      jest.spyOn(userService, 'getuserDetail').mockRejectedValue(new Error('Test error'));

      await expect(controller.getUserByEmail(filter, mockRequest)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('createNewUser', () => {
    it('should call userService.createUser with user data', async () => {
      const createUserDto: CreateUserDto = {
        password: 'password123',
        email: 'test@example.com',
        name: 'Test',
        lastName: 'User',
        gender: 'male',
        birthDay: '1990-01-01',
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);

      const result = await controller.createNewUser(createUserDto);

      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });

    it('should rethrow HttpException', async () => {
      const createUserDto: CreateUserDto = {
        password: 'password123',
        email: 'test@example.com',
        name: 'Test',
        lastName: 'User',
        gender: 'male',
        birthDay: '1990-01-01',
      };
      const httpException = new HttpException('Test error', 400);

      jest.spyOn(userService, 'createUser').mockRejectedValue(httpException);

      await expect(controller.createNewUser(createUserDto)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      const createUserDto: CreateUserDto = {
        password: 'password123',
        email: 'test@example.com',
        name: 'Test',
        lastName: 'User',
        gender: 'male',
        birthDay: '1990-01-01',
      };

      jest.spyOn(userService, 'createUser').mockRejectedValue(new Error('Test error'));

      await expect(controller.createNewUser(createUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getUserByid', () => {
    it('should call userService.getuserByid with user id from request', async () => {
      jest.spyOn(userService, 'getuserByid').mockResolvedValue(mockUser);

      const result = await controller.getUserByid(mockRequest);

      expect(userService.getuserByid).toHaveBeenCalledWith(mockRequest.user.sub);
      expect(result).toEqual(mockUser);
    });

    it('should rethrow HttpException', async () => {
      const httpException = new HttpException('Test error', 400);

      jest.spyOn(userService, 'getuserByid').mockRejectedValue(httpException);

      await expect(controller.getUserByid(mockRequest)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      jest.spyOn(userService, 'getuserByid').mockRejectedValue(new Error('Test error'));

      await expect(controller.getUserByid(mockRequest)).rejects.toThrow(InternalServerErrorException);
    });
  });
});