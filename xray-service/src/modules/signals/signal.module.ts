import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Xray, XraySchema } from '../xray/xray.schema';
import { SignalsController } from './signal.controller';
import { SingalService } from './signal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Xray.name, schema: XraySchema }]),
  ],
  controllers: [SignalsController],
  providers: [SingalService],
})
export class SignalsModule {}
