import { ApiProperty } from '@nestjs/swagger';

export class EntryModel {
  @ApiProperty({
    description: 'Unique identifier for the entry',
    example: '5f8d0d55b54764421b7156c5'
  })
  id?: string;

  @ApiProperty({
    description: 'ID of the user who created the entry',
    example: '5f8d0d55b54764421b7156c5'
  })
  userId?: string;

  @ApiProperty({
    description: 'Title of the journal entry',
    example: 'My day at the beach'
  })
  title: string;

  @ApiProperty({
    description: 'Content of the journal entry',
    example: 'Today I went to the beach and had a great time. The weather was perfect...'
  })
  content: string;

  @ApiProperty({
    description: 'Date when the entry was created',
    example: '2025-07-15T16:30:00.000Z'
  })
  createAt: Date;

  @ApiProperty({
    description: 'Date when the entry was last updated',
    example: '2025-07-15T16:45:00.000Z'
  })
  updateAt: Date;
}
