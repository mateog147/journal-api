import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User password',
    example: 'password123'
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe'
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male'
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'User birth date in ISO format',
    example: '1990-01-01'
  })
  @IsDateString()
  birthDay: string;
}

export class GetUserDto {
  @ApiPropertyOptional({
    description: 'User email address to filter by',
    example: 'john.doe@example.com'
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'User ID to filter by',
    example: '5f8d0d55b54764421b7156c5'
  })
  @IsOptional()
  id?: string;
}
