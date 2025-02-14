import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import rabbitmqConfig from './config/rabbitmq.config';
import envConfig from './config/env.config';
import simulatorConfig from './config/simulator.config';
import { SimulatorModule } from './modules/simular/simulator.module';
import producerConfig from './config/producer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig, envConfig, simulatorConfig, producerConfig],
    }),
    RabbitMQModule,
    SimulatorModule,
  ],
})
export class IotProducerModule {}
