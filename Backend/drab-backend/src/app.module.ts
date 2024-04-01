import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AccountModule } from './api/account/account.module';
import { CustomerModule } from './api/customer/customer.module';
import { GeolocationModule } from './api/geolocation/geolocation.module';
import { SubscriptionModule } from './api/subscription/subscription.module';
import { CountryModule } from './api/country/country.module';
import { NearestlocationModule } from './api/nearestlocation/nearestlocation.module';
import { WeatherstationModule } from './api/weatherstation/weatherstation.module';
import { ContractModule } from './api/contract/contract.module';
import configuration from './config/configuration';
import { AppService } from './app.service';
import { WeatherdataModule } from './api/weatherdata/weatherdata.module';
import { AuthGuard } from './api/auth/Authguard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('database.uri'),
        entities: ['dist/**/*.entity.js'],
        autoLoadEntities: true,
        migrationsRun: true,
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
    AccountModule,
    CustomerModule,
    GeolocationModule,
    SubscriptionModule,
    CountryModule,
    NearestlocationModule,
    WeatherstationModule,
    ContractModule,
    WeatherdataModule,
  ],
  controllers: [],
  providers: [AppService, { provide: 'APP_GUARD', useValue: AuthGuard }],
})
export class AppModule {}
