import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with the login data', async () => {
      const loginDto: LoginDto = {
        userName: 'testuser',
        password: 'password123',
      };
      const expectedResult = { access_token: 'test-token' };
      
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResult);
      
      const result = await controller.login(loginDto);
      
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResult);
    });

    it('should rethrow HttpException', async () => {
      const loginDto: LoginDto = {
        userName: 'testuser',
        password: 'password123',
      };
      const httpException = new HttpException('Test error', 400);
      
      jest.spyOn(authService, 'login').mockRejectedValue(httpException);
      
      await expect(controller.login(loginDto)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      const loginDto: LoginDto = {
        userName: 'testuser',
        password: 'password123',
      };
      
      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Test error'));
      
      await expect(controller.login(loginDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});