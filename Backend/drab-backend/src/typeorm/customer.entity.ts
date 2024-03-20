import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
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

  @OneToOne(() => Subscription, (subscription) => subscription.customer)
  subscription: Subscription;
}
