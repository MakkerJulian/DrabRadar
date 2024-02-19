import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CityModule } from './api/city/city.module';
import { CountryModule } from './api/country/country.module';
import { CountryLanguageModule } from './api/country-language/country-language.module';
import { CountrylanguageModule } from './api/countrylanguage/countrylanguage.module';
import { ContractsModule } from './api/contracts/contracts.module';
import { WeatherdataModule } from './api/weatherdata/weatherdata.module';
import { PermissionsModule } from './api/permissions/permissions.module';
import { UserModule } from './api/user/user.module';
import { CustomerModule } from './api/customer/customer.module';
import configuration from './config/configuration';

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
    UsersModule,
    CityModule,
    CountryModule,
    CountryLanguageModule,
    CountrylanguageModule,
    ContractsModule,
    WeatherdataModule,
    PermissionsModule,
    UserModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
