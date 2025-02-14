import {
  Controller,
  Get,
  Logger,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SingalService } from './signal.service';
import { AnalyzeSignalDto } from './signal.dto';

@Controller('signals')
export class SignalsController {
  private readonly logger = new Logger(SignalsController.name);

  constructor(private readonly signalserviceL: SingalService) {}

  @Get('analyze')
  @UsePipes(new ValidationPipe({ transform: true }))
  async analyzeSignal(@Query() query: AnalyzeSignalDto) {
    this.logger.log(`Analyzing signal:${JSON.stringify(query)}`);
    return await this.signalserviceL.analyzeSignal(
      query.deviceId,
      query.from,
      query.to,
      query.fields,
    );
  }
}
