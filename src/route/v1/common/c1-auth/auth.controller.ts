import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import UserService from '@authorization/a1-user/user.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import AuthService from './auth.service';
import ForgotPasswordDto from './dto/forgot-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import SignInDto from './dto/sign-in.dto';
import SignupDto from './dto/sign-up.dto';
import SignInLocalDto from './dto/signin-local.dto';
import SignInWithSocialDto from './dto/signin-with-social.dto';
import SignupLocalDto from './dto/sigup-local.dto';
import { resetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private logger: CustomLoggerService,
  ) {}

  /**
   * SignIn with social
   * @param body
   * @returns
   */
  @Post('signin-with-tokenId')
  async signWithDeviceID(@Body() body: CreateUserDto) {
    if (!body.tokenId) throw new BadRequestException('Device ID not found.');

    return this.authService.signWithTokenId(body);
  }

  /**
   * SignIn with social
   * @param body
   * @returns
   */
  @Post('signin-with-social')
  async signInWithSocial(@Body() body: SignInWithSocialDto) {
    return this.authService.signInWithSocial(body);
  }

  /**
   * Forgot password
   *
   * @param userId
   * @param deviceID
   * @returns
   */
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  /**
   *Sign in with account local
   * @param body
   * @returns
   */
  @Post('signin-local')
  async signInLocal(@Body() body: SignInLocalDto) {
    return this.authService.signInLocal(body);
  }

  /**
   * Sign up with account local
   * @param body
   * @returns
   */
  @Post('signup-local')
  async signupLocal(@Body() body: SignupLocalDto) {
    return this.authService.signupLocal(body);
  }

  /**
   *Sign in with account local
   * @param body
   * @returns
   */
  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  /**
   * Sign up with email and password
   * @param body
   * @returns
   */
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  /**
   * Sign out
   * @param userId
   * @param deviceID
   * @returns
   */
  @Post(':id/sign-out')
  async signout(
    // @GetCurrentUserId() userId: Types.ObjectId,
    @Param('id', ParseObjectIdPipe) userId: Types.ObjectId,
    @Body('deviceID') deviceID: string,
  ) {
    // Remove deviceID and pop fcm token
    await this.userService.removeDeviceID(userId, deviceID);

    return { success: true };
  }

  /**
   * Refresh token
   * @param {refreshToken}
   * @returns
   */
  @Put('refresh-token')
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshToken({ refreshToken });
  }

  @Put('reset-password/:id')
  async resetPassword(
    @Body() body: resetPasswordDto,
    @Param('id') userId: string,
  ) {
    return this.authService.resetPassword(body, userId);
  }
}
