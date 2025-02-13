import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import rabbitmqConfig from './config/rabbitmq.config';
import envConfig from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig, envConfig],
    }),
    RabbitMQModule,
  ],
})
export class IotProducerModule {}
