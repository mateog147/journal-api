import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User password',
    example: 'password123'
  })
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'Username for login',
    example: 'john.doe'
  })
  @IsString()
  userName: string;
}
