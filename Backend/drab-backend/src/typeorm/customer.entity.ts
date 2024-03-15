import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Subscription, (subscription) => subscription.customer)
  subscriptions: Subscription[];
}
