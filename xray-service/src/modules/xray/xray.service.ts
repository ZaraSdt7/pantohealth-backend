import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Xray, XrayDocument } from './xray.schema';
import { Model } from 'mongoose';

@Injectable()
export class XrayService {
  private readonly logger = new Logger(XrayService.name);

  constructor(
    @InjectModel(Xray.name) private readonly XrayModel: Model<XrayDocument>,
  ) {}

  async createXray(data: Partial<Xray>): Promise<Xray> {
    this.logger.log(`Saving Xray data: ${JSON.stringify(data)}`);
    const createdXray = new this.XrayModel(data);
    return await createdXray.save();
  }
  async findAllXrays(): Promise<Xray[]> {
    this.logger.log('Fetching all Xray data');
    return await this.XrayModel.find().exec();
  }
}
