import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type XrayDocument = Xray & Document;

@Schema({ timestamps: true })
export class Xray {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  dataLength: number;

  @Prop({ required: true })
  dataVolume: number;

  @Prop({ type: Array, required: true })
  data: {
    time: number;
    coordinates: {
      x: number;
      y: number;
    };
    speed: number;
  }[];
}

export const XraySchema = SchemaFactory.createForClass(Xray);
