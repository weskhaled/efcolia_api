import {
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/**
 * DeviceState Controller
 */
@ApiBearerAuth()
@ApiTags('deviceState')
@Controller('api/deviceState')
export class DeviceStateController {
  constructor() {}
}
