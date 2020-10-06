import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './User.entity';

/**
 * Profile Service
 */
@Injectable()
export class UserService {
  /**
   * Constructor
   * @param {Repository<Profile>} profileRepository
   * @param {Repository<Roles>} rolesRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Fetches profile from database by UUID
   * @param {number} id
   * @returns {Promise<Profile>} data from queried profile
   */
  get(user_id: number): Promise<User> {
    return this.userRepository.findOne(user_id);
  }

  /**
   * Fetches profile from database by username
   * @param {string} username
   * @returns {Promise<Profile>} data from queried profile
   */
  async getByUsername(login: string): Promise<User> {
    return this.userRepository.findOne({ login });
  }

  /**
   * Fetches profile by username and hashed password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<Profile>} data from queried profile
   */
  getByUsernameAndPass(login: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('login = :login')
      .setParameter('login', login)
      .getOne();
  }
}
