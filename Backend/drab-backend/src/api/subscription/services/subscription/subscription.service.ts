import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from 'src/api/customer/services/customer/customer.service';
import { CreateSubscriptionDto } from 'src/dto/subscription.dto';
import { Subscription } from 'src/typeorm/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly customerService: CustomerService,
  ) {}

  getSubscriptions() {
    return this.subscriptionRepository.find({ relations: ['customer'] });
  }

  async updateToken(customer_id: number) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { customer: true },
    });

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with customer ID ${customer_id} not found`,
      );
    }

    const newToken = await this.generateUniqueToken(10);
    subscription.token = newToken;

    return this.subscriptionRepository.save(subscription);
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const customerId = createSubscriptionDto.customer;

    const token = await this.generateUniqueToken(10);

    const customer = await this.customerService.getCustomerById(customerId);
    if (!customer || !customerId) {
      throw new NotFoundException(`Customer not found`);
    }

    return this.subscriptionRepository.save({
      token: token,
      customer: customer,
    });
  }

  private async generateUniqueToken(length: number): Promise<string> {
    let token = this.generateRandomString(length);
    let existingSubscription = await this.subscriptionRepository.findOne({
      where: { token: token },
    });

    while (existingSubscription) {
      token = this.generateRandomString(length);
      existingSubscription = await this.subscriptionRepository.findOne({
        where: { token: token },
      });
    }

    return token;
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  async getSubscriptionsWithContracts() {
    return this.subscriptionRepository.find({
      relations: ['customer', 'contracts', 'contracts.weatherstations'],
    });
  }

  getByToken(token: string) {
    return this.subscriptionRepository.findOne({
      where: { token: token },
      relations: ['customer', 'contracts', 'contracts.weatherstations'],
    });
  }
}
