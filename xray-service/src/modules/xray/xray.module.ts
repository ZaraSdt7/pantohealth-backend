import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Xray, XraySchema } from './xray.schema';
import { XrayController } from './xray.controller';
import { XrayProccessor } from './xray.processor';
import { XrayService } from './xray.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Xray.name, schema: XraySchema }]),
  ],
  controllers: [XrayController],
  providers: [XrayService, XrayProccessor],
  exports: [XrayService, XrayProccessor],
})
export class XrayModule {}
