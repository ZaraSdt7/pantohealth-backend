import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class CoordinateDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

class DataRecordDto {
  @IsNumber()
  time: number;

  @ValidateNested()
  @Type(() => CoordinateDto)
  coordinates: CoordinateDto;

  @IsNumber()
  speed: number;
}

export class CreateXrayDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsNumber()
  time: number;

  @IsNumber()
  dataLength: number;

  @IsNumber()
  dataVolume: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataRecordDto)
  data: DataRecordDto[];
}
