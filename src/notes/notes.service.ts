import { Injectable, NotFoundException } from '@nestjs/common';
import { notesSchema } from './notes.dto/notes.dto';
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

  async addNote(noteData: Partial<Note>): Promise<Note | { error: string }> {
    const note = await this.notesModel.findByPk(Number(noteData.id));
    try {
      if (note) {
        throw new NotFoundException(
          `Note with ID ${noteData.id} already exist`,
        );
      }
      notesSchema.validateSync(noteData, { abortEarly: false, strict: true });
    } catch (error) {
      if (error instanceof NotFoundException) return { error: error.message };
      return { error: error.errors };
    }
    return this.notesModel.create(noteData);
  }

  async getNoteById(id: string): Promise<Note | { error: string }> {
    const note = await this.notesModel.findByPk(Number(id));
    try {
      if (!note) throw new NotFoundException(`Note with ID ${id} not found`);
    } catch (error) {
      return { error: error.message };
    }
    return note;
  }

  async updateNote(
    id: string,
    noteData: Partial<Note>,
  ): Promise<Note | { error: string }> {
    const note = await this.notesModel.findByPk(Number(id));
    try {
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      notesSchema.validateSync(noteData, { abortEarly: false, strict: true });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { error: error.message };
      }
      return { error: error.errors };
    }
    return note.update(noteData);
  }

  async deleteNote(id: string): Promise<Note | { error: string }> {
    const note = await this.notesModel.findByPk(Number(id));
    try {
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
    } catch (error) {
      return { error: error.message };
    }
    await this.notesModel.destroy({ where: { id: Number(id) } });
    return note;
  }
}
