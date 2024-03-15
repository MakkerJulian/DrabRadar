import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractService } from 'src/api/contract/services/contract/contract.service';
import { CreateSubscriptionDto } from 'src/dto/subscription.dto';
import { Subscription } from 'src/typeorm/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly contractService: ContractService,
  ) {}

  getSubscriptions() {
    return this.subscriptionRepository.find({ relations: ['customer'] });
  }

  async getSubscriptionsWithContracts() {
    return this.subscriptionRepository.find({
      relations: ['customer', 'contracts', 'contracts.weatherstations'],
    });
  }

  createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.save(createSubscriptionDto);
  }
}
