import { Entity, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Geolocation } from './geolocation.entity';

@Entity()
export class Weatherstation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Geolocation, (geolocation) => geolocation.id)
  geolocation: number;

  @Column()
  name: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  elevation: number;
}
