import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device.controller';
import { Client } from './../client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Client])],
  providers: [DeviceService],
  exports: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
