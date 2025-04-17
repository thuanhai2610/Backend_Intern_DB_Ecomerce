import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { UserDocument } from '@authorization/a1-user/schemas/user.schema';
import UserRepository from '@authorization/a1-user/user.repository';
import UserService from '@authorization/a1-user/user.service';
import OtpService from '@common/c2-otp/otp.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import argon2 from 'argon2';
import { Types } from 'mongoose';
import ForgotPasswordDto from './dto/forgot-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import SignInDto from './dto/sign-in.dto';
import SignupDto from './dto/sign-up.dto';
import SignInLocalDto from './dto/signin-local.dto';
import SignInWithSocialDto from './dto/signin-with-social.dto';
import SignupLocalDto from './dto/sigup-local.dto';
import TokenService from './token.service';
import { AuthTokenPayload, TokenPayload } from './types';
import { resetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  async signWithTokenId(body: CreateUserDto): Promise<AuthTokenPayload> {
    const user = await this.userRepository.findOneBy({
      tokenId: body.tokenId,
    });

    if (user) {
      const userUpdated = await this.userRepository.updateOneById(user._id, {
        ...body,
        $addToSet: {
          fcmTokens: body.deviceID,
        },
      });

      return this.generateAuthTokens(userUpdated!);
    }

    const newUser = await this.userRepository.create({
      ...body,
      fcmTokens: [body.deviceID],
    });

    return this.generateAuthTokens(newUser);
  }

  async signInWithSocial(data: SignInWithSocialDto): Promise<AuthTokenPayload> {
    const { deviceID, socialKey, socialType, email } = data;

    let user: any;

    if (email) {
      user = await this.userRepository.findOneBy({
        socialKey,
        socialType,
        email,
      });
    }

    user = await this.userRepository.findOneBy({
      socialKey,
      socialType,
    });

    if (!user && email) {
      const userExist = await this.userService.findOneBy({ email });
      if (userExist)
        user = await this.userService.updateOneById(userExist._id, {
          socialKey,
          socialType,
        });
    }

    if (!user) {
      user = await this.userRepository.create({
        ...data,
        password: socialKey,
      });
    }

    if (user.isDeleted) {
      throw new BadRequestException(
        'Account has been removed from the system.',
      );
    }

    // if exist deviceID => update deviceID and fcmTokens
    if (deviceID) {
      await this.userService.addDeviceID(user._id, deviceID);

      user.deviceID = deviceID;
    }

    // Success
    return this.generateAuthTokens(user);
  }

  async signInLocal(data: SignInLocalDto): Promise<AuthTokenPayload> {
    const { phone, password, deviceID } = data;

    const user = await this.userRepository.findOneBy({ phone });

    if (!user)
      throw new NotFoundException('The account does not exist in the system.');

    if (user.isDeleted) {
      throw new NotFoundException(
        'The account has been removed from the system.',
      );
    }

    // compare password
    const isValidPassword = await this.userRepository.comparePassword(
      user.password,
      password,
    );

    // Check valid password
    if (!isValidPassword)
      throw new BadRequestException('Incorrect phone or password.');

    // if exist deviceID => update deviceID and fcmTokens
    if (deviceID) {
      await this.userService.addDeviceID(user._id, deviceID);
      user.deviceID = deviceID;
    }

    // return authTokens
    return this.generateAuthTokens(user);
  }

  /**
   * Sign up account local
   * @param data
   * @returns
   */
  public async signupLocal(data: SignupLocalDto): Promise<AuthTokenPayload> {
    const { phone, deviceID, otpCode, password, ...rest } = data;

    // require phone and password
    if (!phone || !password)
      throw new BadRequestException('Phone and password are required.');

    // validate user
    const userExist = await this.userService.validateUser({ phone });

    if (userExist && !userExist.isDeleted)
      throw new BadRequestException('Account already exists in the system.');

    // verify otpCode by phone
    await this.otpService.verifyOtpPhone({ phone, otpCode });

    // user item
    const userItem = {
      ...rest,
      deleted: false,
      phone,
      deviceID,
      password,
      fcmTokens: deviceID ? [deviceID] : [],
    };

    // if user has been deleted => update deleted = false
    if (userExist && userExist.isDeleted) {
      const userUpdated = await this.userService.updateOneById(
        userExist._id,
        userItem,
      );

      // generate auth tokens
      return this.generateAuthTokens(userUpdated);
    }

    // create new user
    const newUser = await this.userRepository.create(userItem);

    // check add score to board
    // if (newUser.totalScore) {
    //   this.scoreBoardService.incScoreBoard(
    //     newUser._id,
    //     newUser.totalScore,
    //     `Get points from created a new account #${newUser._id}!`,
    //   );
    // }
    // Success
    return this.generateAuthTokens(newUser);
  }

  /**
   * Forgot password
   *
   * @param data
   */
  public async forgotPassword(phone: ForgotPasswordDto) {
    const user = await this.userRepository.findOneBy(phone);

    if (!user) {
      throw new NotFoundException('this users is not exist in system');
    }
    if (user.isDeleted) {
      throw new NotFoundException('the account has remove fronm the system');
    }

    // send otp
    return this.otpService.sendOtpByPhone({ phone: user.phone });
  }

   /**
   * Sign in with email and password
   * @param data
   * @returns
   */
   public async signIn(data: SignInDto): Promise<AuthTokenPayload> {
    const { password, email, deviceID } = data;

    // Get and check user exist by phone
    const user = await this.userRepository.findOneBy({ email });

    if (!user)
      throw new NotFoundException('The account does not exist in the system.');

    if (user.isDeleted) {
      throw new NotFoundException(
        'The account has been removed fromt the system.',
      );
    }
    // compare password
    const isValidPassword = await this.userRepository.checkPasswordById(
      user._id,
      password,
    );

    // Check valid password
    if (!isValidPassword)
      throw new BadRequestException('Incorrect phone or password.');


    // if exist deviceID => update deviceID and fcmTokens
    if (deviceID) {
      await this.userService.addDeviceID(user._id, deviceID);
      user.deviceID = deviceID;
    }

    // return authTokens
    return this.generateAuthTokens(user);




  }

  public async signup(input: SignupDto) {
    const user = await this.userRepository.findOneBy({
      phone: input.phone,
    });

    if (user && !user.isDeleted) {
      throw new BadRequestException('user is already exists in system');
    }

    // verify otp by phone
    await this.otpService.verifyOtpPhone({
      phone: input.phone,
      otpCode: input.otpCode,
    });

    let data;
    // if user exits has been delete
    if (user && user.isDeleted) {
      const updated = {
        ...input,
        isDeleted: false,
      };
      data = await this.userRepository.updateManyBy({ _id: user._id }, updated);
    } else {
      data = this.userRepository.create(input);
    }

    return {
      message: 'create successfully',
    };
  }

  // public async signup(data: SignupDto): Promise<AuthTokenPayload> {
  //   const { email, deviceID, otpCode, password, ...rest } = data;

  //   // require email and password
  //   if (!email || !password)
  //     throw new BadRequestException('Email and password are required.');

  //   // validate user
  //   const userExist = await this.userService.validateUser({ email });

  //   if (userExist && !userExist.isDeleted)
  //     throw new BadRequestException('Account already exists in the system.');

  //   // verify otpCode by email
  //   await this.otpService.verifyOtpEmail({ email, otpCode });

  //   // user item
  //   const userItem = {
  //     ...rest,
  //     deleted: false,
  //     email,
  //     deviceID,
  //     password,
  //     fcmTokens: deviceID ? [deviceID] : [],
  //   };

  //   // if user has been deleted => update deleted = false
  //   if (userExist && userExist.isDeleted) {
  //     const userUpdated = await this.userService.updateOneById(
  //       userExist._id,
  //       userItem,
  //     );

  //     // generate auth tokens
  //     return this.generateAuthTokens(userUpdated);
  //   }

  //   // create new user
  //   const newUser = await this.userRepository.create(userItem);

  //   return this.generateAuthTokens(newUser);
  // }

  /**
   * Refresh token
   * @param param0
   */
  public async refreshToken({ refreshToken }: RefreshTokenDto) {
    const decoded = await this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userService.findOneById(
      new Types.ObjectId(decoded._id),
    );

    if (!user) throw new NotFoundException('Invalid refreshToken');

    return this.generateAuthTokens(user);
  }

  /**
   * Generate auth tokens
   * @param userDoc
   * @returns
   */
  public async generateAuthTokens(
    userDoc: UserDocument,
  ): Promise<AuthTokenPayload> {
    const { password, socialKey, ...rest } = userDoc.toObject();

    // Create payload
    const tokenPayload: TokenPayload = {
      _id: rest._id,
      role: rest.role,
    };

    // Generate ac_token and rf_token
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(tokenPayload),
      this.tokenService.generateRefreshToken(tokenPayload),
    ]);

    // create new user
    const newUser: any = rest;

    return {
      accessToken,
      refreshToken,
      user: newUser,
    };
  }
  public async resetPassword(input: resetPasswordDto, userId: string) {
    const user = await this.userRepository.findOneById(userId);

    if (!user)
      throw new NotFoundException('The account does not exist in the system.');

    if (user.isDeleted) {
      throw new NotFoundException(
        'The account has been removed from the system.',
      );
    }

    // comfirm password
    if (input.newPassword !== input.confirmPassword) {
      throw new BadRequestException('Password does not match!');
    }

    // Hash password with argon2
    const hashedPassword = await argon2.hash(input.newPassword);

    // Update user password
    const result = await this.userRepository.updateOneBy(
      { _id: userId },
      { password: hashedPassword },
    );

    return { result, message: 'Reset password successfully' };
  }
  async deleteUserByEmail(email: string): Promise<void> {
    await this.userRepository.deleteByEmail(email);
  }
  
}