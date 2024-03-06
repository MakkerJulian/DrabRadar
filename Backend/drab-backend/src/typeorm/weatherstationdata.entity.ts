import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Weatherstation } from './weatherstation.entity';

@Entity()
export class WeatherstationData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Weatherstation, (weatherstation) => weatherstation.name)
  weatherstation: string;

  @Column()
  datetime: Date;

  @Column('decimal', { precision: 6, scale: 2 })
  temp: number;

  @Column('decimal', { precision: 6, scale: 2 })
  dew_point: number;

  @Column('decimal', { precision: 6, scale: 2 })
  s_airpressure: number;

  @Column('decimal', { precision: 6, scale: 2 })
  sea_airpressure: number;

  @Column('decimal', { precision: 6, scale: 2 })
  visibility: number;

  @Column('decimal', { precision: 6, scale: 2 })
  windspeed: number;

  @Column('decimal', { precision: 6, scale: 2 })
  precipitation: number;

  @Column('decimal', { precision: 6, scale: 2 })
  snow_amount: number;

  @Column({ default: false })
  freezing: boolean;

  @Column({ default: false })
  rain: boolean;

  @Column({ default: false })
  snow: boolean;

  @Column({ default: false })
  hail: boolean;

  @Column({ default: false })
  thunder: boolean;

  @Column({ default: false })
  tornado: boolean;

  // Clouds are a percentage
  @Column('decimal', { precision: 6, scale: 2 })
  clouds: number;

  @Column()
  wind_direction: number;
}
