import {
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHello(): string {
    return 'Service up';
  }
}
