import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserPasswordUseCase } from '../../../../journal/domain/use-cases';
import { createHash } from 'crypto';
import { LoginDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { IPasswordHash } from '../../../../journal/domain/model';
import { PassportHasher } from '../auth/password-hasher';

@Injectable()
export class AuthService {
  private passwordHash: IPasswordHash;
  constructor(
    private validateUserPasswordUseCase: ValidateUserPasswordUseCase,
    private jwtService: JwtService,
  ) {
    this.passwordHash = new PassportHasher();
  }

  async login(data: LoginDto) {
    try {
      const user = await this.validateUserPasswordUseCase.apply(
        data.userName,
        data.password,
        this.passwordHash,
      );

      if (!user) {
        throw new UnauthorizedException('Invalid user o password');
      }

      const payload = { sub: user['_id'] };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log('error :>> ', error);
      throw error;
    }
  }

  hashPwd(password: string): string {
    const hash = createHash('sha224');
    hash.update(password);
    const pwdHash = hash.digest('hex');
    return pwdHash;
  }
}