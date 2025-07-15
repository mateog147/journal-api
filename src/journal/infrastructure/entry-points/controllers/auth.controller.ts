import {
  Body,
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtTokenModel } from '../models';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) { }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT token',
    type: JwtTokenModel
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('login')
  async login(@Body() data: LoginDto) {
    try {
      return await this.appService.login(data);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }
}
