import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Contract } from './contract.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToOne(() => Customer, (customer) => customer.id)
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => Contract, (contract) => contract.subscription)
  contracts: Contract[];
}
