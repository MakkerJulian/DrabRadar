import {
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
} from 'typeorm';
import { Subscription } from './subscription.entity';
import { Weatherstation } from './weatherstation.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key to Subscription
  @ManyToOne(() => Subscription, (subscription) => subscription.id)
  subscription: number;

  @Column()
  level: number;

  @ManyToMany(() => Weatherstation)
  @JoinTable()
  weatherstations: Weatherstation[];

  @Column({ nullable: true })
  lastCallDate: Date;
}
