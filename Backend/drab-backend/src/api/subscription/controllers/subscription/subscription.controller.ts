import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/dto/subscription.dto';
import { AuthGuard } from 'src/api/auth/Authguard';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(AuthGuard)
  @Get()
  getSubscription() {
    return this.subscriptionService.getSubscriptions();
  }

  @Post('refresh_token/:id')
  refreshToken(@Param('id', ParseIntPipe) customer_id: number) {
    return this.subscriptionService.updateToken(customer_id);
  }

  @Get('contracts')
  getSubscriptionsWithContracts() {
    return this.subscriptionService.getSubscriptionsWithContracts();
  }

  @Post()
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }
}
