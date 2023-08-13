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
import { notesSchema } from './notes.schema';

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

  // @Post()
  // async create(@Body() dto: NotesDto) {
  //   try {
  //     notesSchema.validateSync(dto, { abortEarly: false, strict: true });
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  //   return this.notesService.addNote(dto);
  // }

  @Get(':id')
  async getNote(@Param('id') id: string) {
    return this.notesService.getNoteById(id);
  }

  // @Patch(':id')
  // async updateNote(@Param('id') id: string, @Body() dto: NotesDto) {
  //   try {
  //     notesSchema.validateSync(dto, { abortEarly: false, strict: true });
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  //   return this.notesService.create(dto);
  // }

  // @Delete(':id')
  // async deleteNote(@Param('id') id: string) {
  //   return this.notesService.deleteNote(id);
  // }
}
