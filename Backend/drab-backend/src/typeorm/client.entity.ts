import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  phone: number;
}
