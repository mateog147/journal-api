import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  gender: string;

  @IsDateString()
  birthDay: string;
}

export class GetUserDto {
  @IsOptional()
  email?: string;

  @IsOptional()
  id?: string;
}
