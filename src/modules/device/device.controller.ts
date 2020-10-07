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

  @Get(':client_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Device Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Device Request Failed' })
  async getClient(@Param('client_id') client_id: number): Promise<Device> {
    const device = await this.deviceService.get(client_id);
    if (!device) {
      throw new BadRequestException(
        'The device could not be found.',
      );
    }
    return device;
  }

  @Get('getAll')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Clients Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Clients Request Failed' })
  async getClients(): Promise<Device[]> {
    const clients = await this.deviceService.getAll();
    if (!clients) {
      throw new BadRequestException(
        'The device could not be found.',
      );
    }
    return clients;
  }
}
