import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesDto } from './notes.dto/notes.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private notesModel: typeof Note) {}

  async getNotes(): Promise<Note[]> {
    return this.notesModel.findAll({});
  }

  async getNotesStats(): Promise<any> {
    const notes = await this.getNotes();
    const categoriesData = [];
    notes.forEach((note) => {
      const currentCategoryIndex = categoriesData.findIndex(
        (category) => category.categoryName === note.category,
      );
      if (currentCategoryIndex === -1) {
        categoriesData.push({
          categoryName: note.category,
          active: note.archived ? 0 : 1,
          archived: note.archived ? 1 : 0,
        });
      } else {
        categoriesData[currentCategoryIndex].active += note.archived ? 0 : 1;
        categoriesData[currentCategoryIndex].archived += note.archived ? 1 : 0;
      }
    });
    return categoriesData;
  }

  async addNote(noteData: Partial<Note>): Promise<Note> {
    return this.notesModel.create(noteData);
  }

  async getNoteById(id: string): Promise<Note | null> {
    const note = await this.notesModel.findByPk(Number(id));

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  // async updateNote(id: string, dto: NotesDto) {
  //   return this.notes.map((note) => {
  //     if (note.id === Number(id)) return { ...note, ...dto };
  //     return note;
  //   });
  // }

  // async deleteNote(id: string) {
  //   return this.notes.filter((note) => note.id !== Number(id));
  // }
}
