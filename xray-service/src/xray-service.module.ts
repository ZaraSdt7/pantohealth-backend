import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import rabbitmqConfig from './config/rabbitmq.config';
import envConfig from './config/env.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig, envConfig, databaseConfig],
    }),

    RabbitMQModule,
  ],
})
export class XrayModule {}
