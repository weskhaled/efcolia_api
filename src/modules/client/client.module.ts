import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { Device } from '../device/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Device])],
  providers: [ClientService],
  exports: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
