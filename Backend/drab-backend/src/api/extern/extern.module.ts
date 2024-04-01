import { Module } from '@nestjs/common';
import { ExternController } from './controllers/extern/extern.controller';
import { ExternService } from './services/extern/extern.service';

@Module({
  controllers: [ExternController],
  providers: [ExternService]
})
export class ExternModule {}
