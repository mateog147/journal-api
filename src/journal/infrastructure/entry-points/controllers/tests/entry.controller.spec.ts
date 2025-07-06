import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, HttpException, InternalServerErrorException } from '@nestjs/common';
import { EntryController } from '../entry.controller';
import { EntryService } from '../../services/entry.service';
import { CreateEntryDto, GetEntriesByDateDto, UpdateEntryDto } from '../../dto/entry.dto';
import { IEntry } from '../../../../domain/entities';
import { AuthGuard } from '../../auth';

describe('EntryController', () => {
  let controller: EntryController;
  let entryService: EntryService;

  const mockRequest = {
    user: {
      sub: 'test-user-id',
    },
  };

  const mockEntry: IEntry = {
    id: 'test-entry-id',
    userId: 'test-user-id',
    title: 'Test Entry',
    content: 'Test Content',
    createAt: new Date(),
    updateAt: new Date(),
  };

  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryController],
      providers: [
        {
          provide: EntryService,
          useFactory: () => ({
            createEntry: jest.fn(),
            updateEntry: jest.fn(),
            getEntriesByDate: jest.fn(),
            deleteEntry: jest.fn(),
          }),

        },
      ],
    }).overrideGuard(AuthGuard)
      .useValue(mockTokenGuard).compile();

    controller = module.get<EntryController>(EntryController);
    entryService = module.get<EntryService>(EntryService);
  });



  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(entryService).toBeDefined();
  });

  describe('createNewEntry', () => {
    it('should call entryService.createEntry with user id and entry data', async () => {
      const createEntryDto: CreateEntryDto = {
        title: 'Test Entry',
        content: 'Test Content',
      };

      jest.spyOn(entryService, 'createEntry').mockResolvedValue(mockEntry);

      const result = await controller.createNewEntry(createEntryDto, mockRequest);

      expect(entryService.createEntry).toHaveBeenCalledWith(mockRequest.user.sub, createEntryDto);
      expect(result).toEqual(mockEntry);
    });

    it('should rethrow HttpException', async () => {
      const createEntryDto: CreateEntryDto = {
        title: 'Test Entry',
        content: 'Test Content',
      };
      const httpException = new HttpException('Test error', 400);

      jest.spyOn(entryService, 'createEntry').mockRejectedValue(httpException);

      await expect(controller.createNewEntry(createEntryDto, mockRequest)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      const createEntryDto: CreateEntryDto = {
        title: 'Test Entry',
        content: 'Test Content',
      };

      jest.spyOn(entryService, 'createEntry').mockRejectedValue(new Error('Test error'));

      await expect(controller.createNewEntry(createEntryDto, mockRequest)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateEntry', () => {
    it('should call entryService.updateEntry with entry id, user id and update data', async () => {
      const updateEntryDto: UpdateEntryDto = {
        title: 'Updated Title',
        content: 'Updated Content',
      };
      const entryId = 'test-entry-id';

      jest.spyOn(entryService, 'updateEntry').mockResolvedValue(mockEntry);

      const result = await controller.updateEntry(updateEntryDto, entryId, mockRequest);

      expect(entryService.updateEntry).toHaveBeenCalledWith(entryId, mockRequest.user.sub, updateEntryDto);
      expect(result).toEqual(mockEntry);
    });

    it('should rethrow HttpException', async () => {
      const updateEntryDto: UpdateEntryDto = {
        title: 'Updated Title',
      };
      const entryId = 'test-entry-id';
      const httpException = new HttpException('Test error', 400);

      jest.spyOn(entryService, 'updateEntry').mockRejectedValue(httpException);

      await expect(controller.updateEntry(updateEntryDto, entryId, mockRequest)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      const updateEntryDto: UpdateEntryDto = {
        content: 'Updated Content',
      };
      const entryId = 'test-entry-id';

      jest.spyOn(entryService, 'updateEntry').mockRejectedValue(new Error('Test error'));

      await expect(controller.updateEntry(updateEntryDto, entryId, mockRequest)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getEntriesByDay', () => {
    it('should call entryService.getEntriesByDate with user id and date params', async () => {
      const getEntriesDto: GetEntriesByDateDto = {
        start: '2023-01-01',
        end: '2023-01-31',
      };
      const mockEntries: IEntry[] = [mockEntry];

      jest.spyOn(entryService, 'getEntriesByDate').mockResolvedValue(mockEntries);

      const result = await controller.getEntriesByDay(getEntriesDto, mockRequest);

      expect(entryService.getEntriesByDate).toHaveBeenCalledWith(mockRequest.user.sub, getEntriesDto);
      expect(result).toEqual(mockEntries);
    });

    it('should rethrow HttpException', async () => {
      const getEntriesDto: GetEntriesByDateDto = {
        start: '2023-01-01',
        end: '2023-01-31',
      };
      const httpException = new HttpException('Test error', 400);

      jest.spyOn(entryService, 'getEntriesByDate').mockRejectedValue(httpException);

      await expect(controller.getEntriesByDay(getEntriesDto, mockRequest)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      const getEntriesDto: GetEntriesByDateDto = {
        start: '2023-01-01',
        end: '2023-01-31',
      };

      jest.spyOn(entryService, 'getEntriesByDate').mockRejectedValue(new Error('Test error'));

      await expect(controller.getEntriesByDay(getEntriesDto, mockRequest)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteEntry', () => {
    it('should call entryService.deleteEntry with entry id and user id', async () => {
      const entryId = 'test-entry-id';

      jest.spyOn(entryService, 'deleteEntry').mockResolvedValue(undefined);

      await controller.deleteEntry(entryId, mockRequest);

      expect(entryService.deleteEntry).toHaveBeenCalledWith(entryId, mockRequest.user.sub);
    });

    it('should rethrow HttpException', async () => {
      const entryId = 'test-entry-id';
      const httpException = new HttpException('Test error', 400);

      jest.spyOn(entryService, 'deleteEntry').mockRejectedValue(httpException);

      await expect(controller.deleteEntry(entryId, mockRequest)).rejects.toThrow(httpException);
    });

    it('should throw InternalServerErrorException for non-HttpException errors', async () => {
      const entryId = 'test-entry-id';

      jest.spyOn(entryService, 'deleteEntry').mockRejectedValue(new Error('Test error'));

      await expect(controller.deleteEntry(entryId, mockRequest)).rejects.toThrow(InternalServerErrorException);
    });
  });
});