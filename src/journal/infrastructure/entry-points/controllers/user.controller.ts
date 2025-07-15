import {
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Request,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from 'src/journal/domain';
import { CreateUserDto, GetUserDto } from '../dto/user.dto';
import { AuthGuard } from '../auth/auth-guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserModel } from '../models';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly appService: UserService) { }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiQuery({ type: GetUserDto })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: UserModel
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('query')
  async getUserByEmail(
    @Query()
    filter: GetUserDto,
    @Request() req,
  ): Promise<IUser> {
    try {
      console.log('req.user :>> ', req.user);
      return await this.appService.getuserDetail(filter);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserModel
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  @ApiResponse({ status: 409, description: 'Conflict - User already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  async createNewUser(@Body() data: CreateUserDto): Promise<IUser> {
    try {
      return await this.appService.createUser(data);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserModel
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getUserByid(@Request() req): Promise<IUser> {
    try {
      const id = req.user.sub;
      return await this.appService.getuserByid(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }
}
