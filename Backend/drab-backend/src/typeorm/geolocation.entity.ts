import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { Weatherstation } from './weatherstation.entity';

@Entity()
export class Geolocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Country, (Country) => Country.code)
  country: Country;

  @Column({ nullable: true })
  island: string;

  @Column({ nullable: true })
  county: string;

  @Column({ nullable: true })
  place: string;

  @Column({ nullable: true })
  hamlet: string;

  @Column({ nullable: true })
  town: string;

  @Column({ nullable: true })
  municipality: string;

  @Column({ nullable: true })
  state_district: string;

  @Column({ nullable: true })
  administrative: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  village: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  province: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  locality: string;

  @Column({ nullable: true })
  postcode: string;

  @OneToOne(() => Weatherstation, (Weatherstation) => Weatherstation.name)
  @JoinColumn()
  weatherstation: Weatherstation;
}
