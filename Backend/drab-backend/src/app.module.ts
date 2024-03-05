import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
// import { UserModule } from './api/user/user.module';
import { AccountModule } from './api/account/account.module';
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
    // UserModule,
    AccountModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
