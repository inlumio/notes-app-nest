import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Note extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  category: string;

  @Column
  content: string;

  @Column
  created: string;

  @Column({ defaultValue: false })
  archived: boolean;

  @Column({ defaultValue: '' })
  dates: string;
}
