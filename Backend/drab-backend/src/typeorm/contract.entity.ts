import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key to Subscription
  @ManyToOne(() => Subscription, (subscription) => subscription.id)
  subscription: number;

  @Column()
  level: number;
}
