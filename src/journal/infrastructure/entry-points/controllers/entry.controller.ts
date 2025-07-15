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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { EntryModel } from '../models';

@ApiTags('entry')
@Controller('api/entry')
export class EntryController {
  constructor(private readonly appService: EntryService) { }

  @ApiOperation({ summary: 'Create new journal entry' })
  @ApiBody({ type: CreateEntryDto })
  @ApiResponse({
    status: 201,
    description: 'Entry created successfully',
    type: EntryModel
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Update existing journal entry' })
  @ApiParam({ name: 'id', description: 'Entry ID', example: '5f8d0d55b54764421b7156c5' })
  @ApiBody({ type: UpdateEntryDto })
  @ApiResponse({
    status: 200,
    description: 'Entry updated successfully',
    type: EntryModel
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiResponse({ status: 403, description: 'Forbidden - Cannot update entry of another user' })
  @ApiResponse({ status: 404, description: 'Not found - Entry does not exist' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Get entries by date range' })
  @ApiQuery({ type: GetEntriesByDateDto })
  @ApiResponse({
    status: 200,
    description: 'Entries retrieved successfully',
    type: [EntryModel]
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid date range' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Delete journal entry' })
  @ApiParam({ name: 'id', description: 'Entry ID', example: '5f8d0d55b54764421b7156c5' })
  @ApiResponse({ status: 204, description: 'Entry deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiResponse({ status: 403, description: 'Forbidden - Cannot delete entry of another user' })
  @ApiResponse({ status: 404, description: 'Not found - Entry does not exist' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
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
