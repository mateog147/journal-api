import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IEntry } from 'src/journal/domain';

export class CreateEntryDto implements Partial<IEntry> {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class UpdateEntryDto implements Partial<IEntry> {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class GetEntriesByDateDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;
}
