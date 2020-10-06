import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';

/**
 * Profile Controller
 */
@ApiBearerAuth()
@ApiTags('user')
@Controller('api/user')
export class UserController {
  /**
   * Constructor
   * @param profileService
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves a particular profile
   * @param username the profile given username to fetch
   * @returns {Promise<Profile>} queried profile data
   */
  @Get(':login')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
  async getProfile(@Param('login') login: string): Promise<User> {
    const profile = await this.userService.getByUsername(login);
    if (!profile) {
      throw new BadRequestException(
        'The profile with that username could not be found.',
      );
    }
    return profile;
  }
}
