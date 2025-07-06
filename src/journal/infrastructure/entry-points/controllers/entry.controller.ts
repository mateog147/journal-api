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
  Put,
  Param,
  Delete
} from '@nestjs/common';
import { IEntry } from '../../../domain/entities';
import { AuthGuard } from '../auth/auth-guard';
import { EntryService } from '../services';
import {
  CreateEntryDto,
  GetEntriesByDateDto,
  UpdateEntryDto,
} from '../dto/entry.dto';


@Controller('api/entry')
export class EntryController {
  constructor(private readonly appService: EntryService) { }

  @UseGuards(AuthGuard)
  @Post()
  async createNewEntry(
    @Body() data: CreateEntryDto,
    @Request() req,
  ): Promise<IEntry> {
    try {
      console.log('createNewEntry start');
      const res = await this.appService.createEntry(req.user.sub, data);
      console.log('createNewEntry success');
      return res;
    } catch (error) {
      console.error('createNewEntry Fail', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateEntry(
    @Body() data: UpdateEntryDto,
    @Param('id') id: string,
    @Request() req,
  ): Promise<IEntry> {
    try {
      console.log('updateEntry start');
      const res = await this.appService.updateEntry(id, req.user.sub, data);
      console.log('updateEntry success');
      return res;
    } catch (error) {
      console.error('updateEntry Fail', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getEntriesByDay(
    @Query()
    params: GetEntriesByDateDto,
    @Request() req,
  ): Promise<IEntry[]> {
    try {
      console.log('getEntriesByDay for user :>> ', req.user);
      return await this.appService.getEntriesByDate(req.user.sub, params);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteEntry(
    @Param('id') id: string,
    @Request() req,
  ): Promise<void> {
    try {
      console.log(`Deleting entry ${id} for user ${req.user.sub}`);
      await this.appService.deleteEntry(id, req.user.sub);
    } catch (error) {
      console.error('deleteEntry Fail', error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Error');
    }
  }
}
