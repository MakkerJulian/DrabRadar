import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  // Foreign key to client
  @ManyToOne(() => Client, (client) => client.id)
  client: number;
}
