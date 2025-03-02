import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Xray, XrayDocument } from '../xray/xray.schema';

@Injectable()
export class SingalService {
  private readonly logger = new Logger(SingalService.name);

  constructor(
    @InjectModel(Xray.name) private readonly xrayModel: Model<XrayDocument>,
  ) {}

  async analyzeSignal(
    deviceId: string,
    from: number,
    to: number,
    fields?: string[],
  ): Promise<unknown> {
    this.logger.log(
      `Analyzing signal for device ${deviceId} from ${from} to ${to}`,
    );
    try {
      const query = {
        deviceId,
        time: { $gte: from, $lt: to }, //Filter data by time
      };

      //If fields are sent, we will only return those specific fields in the response.
      const options = fields && fields.length > 0 ? fields.join(' ') : '';
      const signal = await this.xrayModel.find(query, options).exec();
      return signal;
    } catch (error) {
      this.logger.error(
        `Error analyzing signal for device ${deviceId}: ${error}`,
      );
      throw error;
    }
  }
}
