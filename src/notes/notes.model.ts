import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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

  @Column({ type: DataType.ARRAY(DataType.DATE), allowNull: true })
  dates: Date[];

  @BeforeCreate
  @BeforeUpdate
  static stringifyDates(instance: Note) {
    if (instance.dates && Array.isArray(instance.dates)) {
      instance.setDataValue('dates', JSON.stringify(instance.dates));
    }
  }
}
