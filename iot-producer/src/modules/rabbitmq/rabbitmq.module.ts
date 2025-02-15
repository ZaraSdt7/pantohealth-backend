import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import rabbitMQConfig from '../../config/rabbitmq.config';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQProducer } from './rabbitmq.producer';
import { SimulatorModule } from '../simular/simulator.module';
import { DataGenerator } from './data-generator-rabbitmq';

@Module({
  imports: [
    ConfigModule.forFeature(rabbitMQConfig),
    ClientsModule.registerAsync([
      {
        name: 'IOT_PRODUCER',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('rabbitmq.uri') ??
                'amqp://guest:guest@rabbitmq:5672',
            ],
            queue: configService.get<string>('rabbitmq.queue'),
            queueOptions: configService.get('rabbitmq.queueOptions'),
          },
        }),
      },
    ]),
    SimulatorModule,
  ],
  providers: [RabbitMQService, RabbitMQProducer, DataGenerator],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
