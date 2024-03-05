import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  // Foreign key to customer
  @ManyToOne(() => Customer, (customer) => customer.id)
  client: number;
}
