import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/dto/subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  getSubscription() {
    return this.subscriptionService.getSubscriptions();
  }

  @Post()
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }
}
