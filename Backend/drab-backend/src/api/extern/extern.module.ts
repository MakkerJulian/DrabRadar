import { Module } from '@nestjs/common';
import { ExternController } from './controllers/extern/extern.controller';
import { ExternService } from './services/extern/extern.service';
import { SubscriptionModule } from '../subscription/subscription.module';
import { WeatherstationModule } from '../weatherstation/weatherstation.module';
import { WeatherdataModule } from '../weatherdata/weatherdata.module';

@Module({
  imports: [SubscriptionModule, WeatherstationModule, WeatherdataModule],
  exports: [ExternService],
  controllers: [ExternController],
  providers: [ExternService],
})
export class ExternModule { }