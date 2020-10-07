import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { Client } from './client.entity';

/**
 * Client Controller
 */
@ApiBearerAuth()
@ApiTags('client')
@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':client_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Client Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Client Request Failed' })
  async getClient(@Param('client_id') client_id: number): Promise<Client> {
    const client = await this.clientService.get(client_id);
    if (!client) {
      throw new BadRequestException(
        'The client could not be found.',
      );
    }
    return client;
  }

  @Get('getAll')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch Clients Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Clients Request Failed' })
  async getClients(): Promise<Client[]> {
    const clients = await this.clientService.getAll();
    if (!clients) {
      throw new BadRequestException(
        'The client could not be found.',
      );
    }
    return clients;
  }
}
