import { Module } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorController } from './simulator.controller';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { DataGenerator } from './data-generator';

@Module({
  imports: [RabbitMQModule],
  controllers: [SimulatorController],
  providers: [SimulatorService, DataGenerator],
})
export class SimulatorModule {}
