import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from './Device.entity';

/**
 * Client Service
 */
@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  get(device_id: number): Promise<Device> {
    return this.deviceRepository.findOne(device_id);
  }

  getAll(): Promise<Device[]> {
    return this.deviceRepository.find({ take: 500 });
  }
}
