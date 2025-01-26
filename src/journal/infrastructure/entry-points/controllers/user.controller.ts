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
import { IUser } from 'src/journal/domain/model';
import { CreateUserDto, GetUserDto } from '../dto/user.dto';
import { AuthGuard } from '../auth/auth-guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('user')
  getUserByEmail(
    @Query()
    filter: GetUserDto,
    @Request() req,
  ): Promise<IUser> {
    try {
      console.log('req.user :>> ', req.user);
      return this.appService.getuserDetail(filter);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }

  @Post()
  createNewUser(@Body() data: CreateUserDto): Promise<IUser> {
    try {
      return this.appService.createUser(data);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserByid(@Request() req): Promise<IUser> {
    try {
      const id = req.user.sub;
      return this.appService.getuserByid(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }
}
