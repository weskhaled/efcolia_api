import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeviceState } from './deviceState.entity';

/**
 * Client Service
 */
@Injectable()
export class DeviceStateService {
  constructor(
    @InjectRepository(DeviceState)
    private readonly deviceStateRepository: Repository<DeviceState>,
  ) {}

  get(device_id: number): Promise<DeviceState> {
    return this.deviceStateRepository.findOne(device_id);
  }

  getDevicesByClientId(client_id: number): Promise<DeviceState[]> {
    return this.deviceStateRepository.find({where: { client_id }, take: 100 });
  }

  getAll(): Promise<DeviceState[]> {
    return this.deviceStateRepository.find({ take: 100 });
  }
}
