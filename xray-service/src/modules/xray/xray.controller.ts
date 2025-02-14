import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { XrayService } from './xray.service';
import { CreateXrayDto } from './xray.dto';

@Controller('xray')
export class XrayController {
  private readonly logger = new Logger(XrayController.name);
  constructor(private readonly xrayService: XrayService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createXray(@Body() createXrayDto: CreateXrayDto) {
    this.logger.log(`Received Xray data: ${JSON.stringify(createXrayDto)}`);
    const result = await this.xrayService.createXray(createXrayDto);
    this.logger.log('Xray data saved and created successfully');
    return result;
  }

  @Get()
  async findAllXrays() {
    this.logger.log('Fetching all Xrays');
    return await this.xrayService.findAllXrays();
  }
}
