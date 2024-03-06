import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Weatherstation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("decimal",{ precision: 6, scale: 2 })
  longitude: number;

  @Column("decimal",{ precision: 6, scale: 2 })
  latitude: number;

  @Column("decimal",{ precision: 6, scale: 2 })
  elevation: number;
}
