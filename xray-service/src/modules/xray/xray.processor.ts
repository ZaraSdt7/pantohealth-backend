import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { XrayService } from './xray.service';
import { plainToInstance } from 'class-transformer';
import { CreateXrayDto } from './xray.dto';
import { validate } from 'class-validator';

@Injectable()
export class XrayProccessor {
  private readonly logger = new Logger(XrayProccessor.name);

  constructor(private readonly xrayService: XrayService) {}

  async processXrayData(paylod: any) {
    this.logger.log(`Processing Xray data: ${JSON.stringify(paylod)}`);

    const dataLength = paylod.data.length;
    const dataVolume = JSON.stringify(paylod.data).length;
    const xrayData = {
      deviceId: paylod.deviceId,
      time: paylod.time,
      dataLength,
      dataVolume,
      data: paylod.data.map((values) => ({
        time: values[0],
        coordinates: {
          x: values[1][0],
          y: values[1][1],
        },
        speed: values[1][2],
      })),
    };
    //Validation using CreateXrayDto
    const InstanceData = plainToInstance(CreateXrayDto, xrayData);
    const errorData = await validate(InstanceData);
    if (errorData.length > 0) {
      this.logger.error(`Validation errors: ${JSON.stringify(errorData)}`);
      throw new BadRequestException(
        ' Invalid  Instance xray data: ' + JSON.stringify(errorData),
      );
    }
    await this.xrayService.createXray(xrayData);
    this.logger.log('Xray Data saved successfully');
  }
}
