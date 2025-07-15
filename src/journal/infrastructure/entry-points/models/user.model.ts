import { ApiProperty } from '@nestjs/swagger';

export class LoginInfoModel {
  @ApiProperty({
    description: 'User password (hashed)',
    example: '$2b$10$X/xY/xZ...'
  })
  password: string;
}

export class ContactInfoModel {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John'
  })
  name: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe'
  })
  lastName: string;
}

export class UserModel {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '5f8d0d55b54764421b7156c5'
  })
  _id?: string;

  @ApiProperty({
    description: 'Username for login',
    example: 'john.doe'
  })
  userName: string;

  @ApiProperty({
    description: 'Login information',
    type: LoginInfoModel
  })
  loginInfo: LoginInfoModel;

  @ApiProperty({
    description: 'Contact information',
    type: ContactInfoModel
  })
  contactInfo: ContactInfoModel;

  @ApiProperty({
    description: 'User gender',
    example: 'male'
  })
  gender: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-01-01T00:00:00.000Z'
  })
  birthDay: Date;
}
