import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Weatherstation } from './weatherstation.entity';

@Entity()
export class Storing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column({ default: () => 'NOW()' })
  timestamp: Date;

  @ManyToOne(() => Weatherstation, (weatherstation) => weatherstation.name)
  weatherstation: Weatherstation;
}
