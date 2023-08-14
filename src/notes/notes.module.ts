import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from './notes.model';

@Module({
  imports: [SequelizeModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
