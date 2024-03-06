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

  @Column('decimal', { precision: 6, scale: 2 })
  longitude: number;

  @Column('decimal', { precision: 6, scale: 2 })
  latitude: number;
}
function JoinColumn(): (
  target: NearestLocation,
  propertyKey: 'weatherstation',
) => void {
  throw new Error('Function not implemented.');
}
