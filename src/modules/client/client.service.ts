import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './client.entity';

/**
 * Client Service
 */
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  get(client_id: number): Promise<Client> {
    return this.clientRepository.findOne(client_id);
  }

  getAll(): Promise<Client[]> {
    return this.clientRepository.find({ take: 100 });
  }
}
