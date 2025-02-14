import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { DataGenerator } from './data-generator';

@Injectable()
export class SimulatorService implements OnModuleDestroy {
  private readonly logger = new Logger(SimulatorService.name);
  private intervalId: NodeJS.Timeout | null;
  private dataGenerator = new DataGenerator();

  constructor(
    private readonly configService: ConfigService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  startSimulation() {
    if (this.intervalId) {
      this.logger.warn('Simulation is already running');
      return;
    }

    const interval = this.configService.get<number>('simulator.interval');

    this.intervalId = setInterval(() => {
      // Using DataGenerator to generate X-ray data
      const generatedData = this.dataGenerator.generateXRayData();

      this.logger.log(`Sending X-Ray Data: ${JSON.stringify(generatedData)}`);
      this.rabbitMQService.sendMessage('x-ray-data', generatedData);
    }, interval);

    this.logger.log('X-Ray Data Simulation Started');
  }

  stopSimulation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.logger.log('X-Ray Data Simulation Stopped');
    } else {
      this.logger.warn('Simulation is not running');
    }
  }

  onModuleDestroy() {
    this.stopSimulation();
  }
}
