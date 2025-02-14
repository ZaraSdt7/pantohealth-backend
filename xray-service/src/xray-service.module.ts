import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import rabbitmqConfig from './config/rabbitmq.config';
import databaseConfig from './config/database.config';
import { XrayModule } from './modules/xray/xray.module';
import { SignalsModule } from './modules/signals/signal.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig, databaseConfig],
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),

    RabbitMQModule,
    XrayModule,
    SignalsModule,
  ],
})
export class XrayServiceModule {}
