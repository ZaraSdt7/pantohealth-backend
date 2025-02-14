import { Controller, Post, Logger } from '@nestjs/common';
import { SimulatorService } from './simulator.service';

@Controller('simulator')
export class SimulatorController {
  private readonly logger = new Logger(SimulatorController.name);

  constructor(private readonly simulatorService: SimulatorService) {}

  @Post('start')
  startSimulation() {
    this.logger.log('Starting X-Ray Data Simulation');
    this.simulatorService.startSimulation();
    return { message: 'X-Ray Data Simulation Started' };
  }

  @Post('stop')
  stopSimulation() {
    this.logger.log('Stopping X-Ray Data Simulation');
    this.simulatorService.stopSimulation();
    return { message: 'X-Ray Data Simulation Stopped' };
  }
}
