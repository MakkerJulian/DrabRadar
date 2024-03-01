import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Weatherstation } from './weatherstation.entity';
import { Country } from './country.entity';

@Entity()
export class NearestLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Weatherstation, (weatherstation) => weatherstation.name)
  weatherstation: string;

  @Column()
  admin_region_name1: string;

  @Column({ nullable: true })
  admin_region_name2: string;

  @ManyToOne(() => Country, (country) => country.code)
  country: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;
}
