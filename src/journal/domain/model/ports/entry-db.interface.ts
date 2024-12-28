import { IEntry } from '../entry.interface';

export const EntryDb = 'EntryDb';

export interface IEntryDb {
  getEntriesByUserAndDate: (
    userId: string,
    startDateTime: Date,
    endDateTime: Date,
  ) => Promise<IEntry[]>;
  createEntry: (entry: IEntry) => Promise<IEntry>;
  updateEntryById: (id: string, entry: Partial<IEntry>) => Promise<any>;
  getEntryById: (id: string) => Promise<IEntry>;
}
