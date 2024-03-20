import { Entity, Column, OneToMany } from 'typeorm';
import { Geolocation } from './geolocation.entity';

@Entity()
export class Weatherstation {
  @Column({ primary: true })
  name: string;

  @Column('decimal', { precision: 6, scale: 2 })
  longitude: number;

  @Column('decimal', { precision: 6, scale: 2 })
  latitude: number;

  @Column('decimal', { precision: 6, scale: 2 })
  elevation: number;

  @OneToMany(() => Geolocation, (geolocation) => geolocation.weatherstation)
  geolocations: Geolocation[];
}
