import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Contract } from './contract.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  // Foreign key to customer
  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: number;

  @OneToMany(() => Contract, (contract) => contract.subscription)
  contracts: Contract[];
}
