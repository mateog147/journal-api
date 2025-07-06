import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDbService } from './user-db.service';
import { User } from './schemas/user.schema';
import { IUser } from '../../../../domain';

describe('UserDbService', () => {
    let service: UserDbService;
    let model: Model<User>;

    const mockUser: IUser = {
        userName: 'test@example.com',
        loginInfo: {
            password: 'password123',
        },
        contactInfo: {
            email: 'test@example.com',
            name: 'Test',
            lastName: 'User',
        },
        gender: 'male',
        birthDay: new Date('1990-01-01'),
    };

    const mockUserWithId = {
        ...mockUser,
        _id: 'a-mock-id',
    };

    beforeEach(async () => {
        // Create a mock model function
        const mockModel = jest.fn().mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockUserWithId)
        }));

        // Add static methods to the mock model
        (mockModel as any).findOne = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockUserWithId)
        });

        (mockModel as any).findById = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockUserWithId)
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserDbService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockModel
                },
            ],
        }).compile();

        service = module.get<UserDbService>(UserDbService);
        model = module.get<Model<User>>(getModelToken(User.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createUser', () => {
        it('should create and return a user', async () => {
            // Create a mock instance with a save method
            const mockUserInstance = {
                save: jest.fn().mockResolvedValueOnce(mockUserWithId)
            };

            // Reset the model mock for this test
            jest.clearAllMocks();
            (model as any).mockImplementation(() => mockUserInstance);

            const newUser = { ...mockUser };
            const result = await service.createUser(newUser);

            // Verify the model constructor was called with the user data
            expect(model).toHaveBeenCalledWith(newUser);
            // Verify save was called
            expect(mockUserInstance.save).toHaveBeenCalled();
            // Verify the result
            expect(result).toEqual(mockUserWithId);
        });
    });

    describe('getUserByemail', () => {
        it('should find a user by email', async () => {
            // Reset mocks for this test
            jest.clearAllMocks();
            const mockExec = jest.fn().mockResolvedValueOnce(mockUserWithId);
            (model.findOne as jest.Mock).mockReturnValueOnce({
                exec: mockExec
            });

            const result = await service.getUserByemail('test@example.com');
            expect(model.findOne).toHaveBeenCalledWith({ userName: 'test@example.com' });
            expect(mockExec).toHaveBeenCalled();
            expect(result).toEqual(mockUserWithId);
        });
    });

    describe('getUserById', () => {
        it('should find a user by id', async () => {
            // Reset mocks for this test
            jest.clearAllMocks();
            const mockExec = jest.fn().mockResolvedValueOnce(mockUserWithId);
            (model.findById as jest.Mock).mockReturnValueOnce({
                exec: mockExec
            });

            const result = await service.getUserById('a-mock-id');
            expect(model.findById).toHaveBeenCalledWith('a-mock-id');
            expect(mockExec).toHaveBeenCalled();
            expect(result).toEqual(mockUserWithId);
        });
    });
});