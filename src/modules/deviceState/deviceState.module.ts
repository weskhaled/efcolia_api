import { Module } from '@nestjs/common';
import { DeviceStateService } from './deviceState.service';
import { Device } from '../device/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceStateController } from './deviceState.controller';
import { DeviceState } from './deviceState.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceState])],
  providers: [DeviceStateService],
  exports: [DeviceStateService],
  controllers: [DeviceStateController],
})
export class DeviceStateModule {}
