import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriptionDto } from 'src/dto/subscription.dto';
import { Subscription } from 'src/typeorm/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  getSubscriptions() {
    return this.subscriptionRepository.find({ relations: ['customer'] });
  }

  async updateToken(createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = await this.subscriptionRepository.findOne({ where: { customer: createSubscriptionDto.customer } });
    
    if (!subscription) {
      throw new NotFoundException(`Subscription with customer ID ${createSubscriptionDto.customer} not found`);
    }

    const newToken = await this.generateUniqueToken(10); 
    subscription.token = newToken;

    return this.subscriptionRepository.save(subscription);
}


  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const customerId  = createSubscriptionDto.customer;
    const token = await this.generateUniqueToken(10); 
    const newSubscription = this.subscriptionRepository.create({
      token: token,
      customer: customerId,
    });
    return this.subscriptionRepository.save(newSubscription);
  }
  

  private async generateUniqueToken(length: number): Promise<string> {
    let token = this.generateRandomString(length); 
    let existingSubscription = await this.subscriptionRepository.findOne({ where: {token: token}});

    while (existingSubscription) {
      token = this.generateRandomString(length); 
      existingSubscription = await this.subscriptionRepository.findOne({ where: {token: token} });
    }

    return token;
  }

  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
  }
}

