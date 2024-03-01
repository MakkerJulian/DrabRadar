import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;
}
