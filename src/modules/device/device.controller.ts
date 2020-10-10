import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { Device } from './device.entity';

/**
 * Device Controller
 */
@ApiBearerAuth()
@ApiTags('device')
@Controller('api/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Devices Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Devices Request Failed' })
  async getDevices(): Promise<Device[]> {
    const devices = await this.deviceService.getAll();
    if (!devices) {
      throw new BadRequestException(
        'The device could not be found.',
      );
    }
    return devices;
  }

  @Get(':device_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Device Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Device Request Failed' })
  async getDevice(@Param('device_id') device_id: number): Promise<Device> {
    const device = await this.deviceService.get(device_id);
    if (!device) {
      throw new BadRequestException(
        'The device could not be found.',
      );
    }
    return device;
  }
  
  @Get('byClientId/:client_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Device by client_id Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Device by client_id Request Failed' })
  async getDeviceByClientId(@Param('client_id') client_id: number): Promise<Device[]> {
    const devices = await this.deviceService.getDevicesByClientId(client_id);
    if (!devices) {
      throw new BadRequestException(
        'The device could not be found.',
      );
    }
    return devices;
  }
}
