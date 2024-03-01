import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Weatherstation } from './weatherstation.entity';

@Entity()
export class WeatherstationData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Weatherstation, (weatherstation) => weatherstation.id)
  weatherstation: number;

  @Column()
  datetime: Date;

  @Column()
  temp: number;

  @Column()
  dew_point: number;

  @Column()
  s_airpressure: number;

  @Column()
  sea_airpressure: number;

  @Column()
  visibility: number;

  @Column()
  windspeed: number;

  @Column()
  precipitation: number;

  @Column()
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
  @Column()
  clouds: number;

  @Column()
  wind_direction: number;
}
