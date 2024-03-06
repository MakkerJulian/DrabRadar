import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Weatherstation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  elevation: number;
}
