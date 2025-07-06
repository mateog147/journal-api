import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntryDbService } from './entry.db.service';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';
import { IEntry } from '../../../domain/entities/entry.interface';

describe('EntryDbService', () => {

    let service: EntryDbService;
    let repo: Repository<Entry>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EntryDbService,
                {
                    provide: getRepositoryToken(Entry),
                    useValue: {
                        save: jest.fn(),
                        update: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EntryDbService>(EntryDbService);
        repo = module.get<Repository<Entry>>(getRepositoryToken(Entry));
    });

    it('should create entry', async () => {
        const mockEntry = { id: '1', title: 'Test' } as IEntry;
        (repo.save as jest.Mock).mockResolvedValue(mockEntry);

        const result = await service.createEntry(mockEntry);
        expect(repo.save).toHaveBeenCalledWith(mockEntry);
        expect(result).toEqual(mockEntry);
    });

    it('should update entry', async () => {
        const updateData = { title: 'Updated' };
        (repo.update as jest.Mock).mockResolvedValue({ affected: 1 });

        await service.updateEntryById('1', updateData);
        expect(repo.update).toHaveBeenCalledWith(
            { id: '1' },
            { ...updateData, updateAt: expect.any(Date) }
        );
    });

    it('should get entry by id', async () => {
        const mockEntry = { id: '1' } as IEntry;
        (repo.findOne as jest.Mock).mockResolvedValue(mockEntry);

        const result = await service.getEntryById('1');
        expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        expect(result).toEqual(mockEntry);
    });

    it('should get entries by date range', async () => {
        const mockEntries = [{ id: '1' }] as IEntry[];
        const start = new Date('2023-01-01');
        const end = new Date('2023-01-31');
        (repo.find as jest.Mock).mockResolvedValue(mockEntries);

        const result = await service.getEntriesByUserAndDate('user1', start, end);
        expect(repo.find).toHaveBeenCalledWith({
            where: {
                createAt: expect.anything(),
                userId: 'user1'
            }
        });
        expect(result).toEqual(mockEntries);
    });

    it('should delete entry', async () => {
        (repo.delete as jest.Mock).mockResolvedValue({ affected: 1 });

        await service.deleteEntryById('1');
        expect(repo.delete).toHaveBeenCalledWith({ id: '1' });
    });

    it('should get entry by id', async () => {
        const mockEntry = { id: '1', userId: 'user1' } as IEntry;
        (repo.findOne as jest.Mock).mockResolvedValue(mockEntry);

        const result = await service.getEntryById('1');
        expect(repo.findOne).toHaveBeenCalledWith({
            where: { id: '1' }
        });
        expect(result).toEqual(mockEntry);
    });
});