import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Geolocation } from './geolocation.entity';
import { WeatherData } from './weatherdata.entity';

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

  @OneToOne(() => Geolocation, (geolocation) => geolocation.weatherstation)
  geolocation: Geolocation;

  @OneToMany(() => WeatherData, (weatherdata) => weatherdata.weatherstation)
  weatherdatas: WeatherData[];
}
