import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import rabbitMQConfig from '../../config/rabbitmq.config';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQConsumer } from './rabbitmq.consumer';
import { XrayModule } from '../xray/xray.module';

@Module({
  imports: [
    ConfigModule.forFeature(rabbitMQConfig),
    ClientsModule.registerAsync([
      {
        name: 'X_RAY_SERVICE',
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
    XrayModule,
  ],
  providers: [RabbitMQService, RabbitMQConsumer],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
