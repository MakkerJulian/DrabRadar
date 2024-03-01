import { Entity, ManyToOne } from 'typeorm';
import { Contract } from './contract.entity';
import { Weatherstation } from './weatherstation.entity';

@Entity()
export class ContractWeatherstation {
  @ManyToOne(() => Contract, (contract) => contract.id)
  contract: number;

  @ManyToOne(() => Weatherstation, (weatherstation) => weatherstation.id)
  weatherstation: number;
}
