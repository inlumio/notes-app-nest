import { Injectable } from '@nestjs/common';
import { NotesDto } from './notes.dto/notes.dto';

@Injectable()
export class NotesService {
  private readonly notes: NotesDto[];

  constructor() {
    this.notes = [
      {
        id: 1,
        name: 'Shopping list',
        created: '3/7/2023',
        category: 'Task',
        content: 'Tomatoes, bread',
        archived: false,
        dates: [],
      },
      {
        id: 2,
        name: 'The theory of evolution',
        created: '3/7/2023',
        category: 'Random Thought',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem',
        archived: false,
        dates: [],
      },
      {
        id: 3,
        name: 'New Feature',
        created: '3/12/2023',
        category: 'Idea',
        content: 'Implement new feature on 3/5/2021 and 5/5/2021',
        archived: false,
        dates: [],
      },
      {
        id: 4,
        name: 'Hamlet',
        created: '3/20/2023',
        category: 'Quote',
        content: 'To be or not to be',
        archived: false,
        dates: [],
      },
      {
        id: 5,
        name: 'Books',
        created: '4/17/2023',
        category: 'Task',
        content: 'Buy "The Lord of the Rings" on sale 4/10/2021',
        archived: false,
        dates: [],
      },
      {
        id: 6,
        name: 'Why grass is green',
        created: '5/3/2023',
        category: 'Random Thought',
        content: 'Because it is',
        archived: true,
        dates: [],
      },
      {
        id: 7,
        name: 'Oscar Wilde',
        created: '5/29/2023',
        category: 'Quote',
        content: 'Be yourself; everyone else is already taken.',
        archived: false,
        dates: [],
      },
    ];
  }

  async getNotes() {
    return this.notes;
  }

  async getNotesStats() {
    const categoriesData = [];
    this.notes.forEach((note) => {
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

  async create(dto: NotesDto) {
    return [...this.notes, dto];
  }

  async getNote(id: string) {
    return this.notes.find((note) => note.id === Number(id));
  }

  async updateNote(id: string, dto: NotesDto) {
    return this.notes.map((note) => {
      if (note.id === Number(id)) return { ...note, ...dto };
      return note;
    });
  }

  async deleteNote(id: string) {
    return this.notes.filter((note) => note.id !== Number(id));
  }
}
