import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IEntry } from 'src/journal/domain';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEntryDto implements Partial<IEntry> {
  @ApiProperty({
    description: 'Title of the journal entry',
    example: 'My day at the beach'
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of the journal entry',
    example: 'Today I went to the beach and had a great time. The weather was perfect...'
  })
  @IsString()
  content: string;
}

export class UpdateEntryDto implements Partial<IEntry> {
  @ApiPropertyOptional({
    description: 'Updated title of the journal entry',
    example: 'My amazing day at the beach'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Updated content of the journal entry',
    example: 'Today I spent the whole day at the beach and it was amazing...'
  })
  @IsString()
  @IsOptional()
  content?: string;
}

export class GetEntriesByDateDto {
  @ApiProperty({
    description: 'Start date for filtering entries (ISO format)',
    example: '2025-07-01T00:00:00.000Z'
  })
  @IsDateString()
  start: string;

  @ApiProperty({
    description: 'End date for filtering entries (ISO format)',
    example: '2025-07-15T23:59:59.999Z'
  })
  @IsDateString()
  end: string;
}
