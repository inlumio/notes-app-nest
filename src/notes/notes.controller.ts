import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesDto } from './notes.dto/notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getNotes() {
    return this.notesService.getNotes();
  }

  @Get('stats')
  async getNotesStats() {
    return this.notesService.getNotesStats();
  }

  @Post()
  async create(@Body() dto: NotesDto) {
    return this.notesService.create(dto);
  }

  @Get(':id')
  async getNote(@Param('id') id: string) {
    return this.notesService.getNote(id);
  }

  @Patch(':id')
  async updateNote(@Param('id') id: string, @Body() dto: NotesDto) {
    return this.notesService.updateNote(id, dto);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(id);
  }
}
