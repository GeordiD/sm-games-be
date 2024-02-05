import { _envConfig } from '@/common/envConfig';
import jwt from 'jsonwebtoken';

export class JwtService {
  private secret: string;
  private refreshExp: string;

  constructor() {
    this.secret = _envConfig.getFromEnv('JWT_SECRET');
    this.refreshExp = _envConfig.getFromEnv('REFRESH_TOKEN_EXP');
  }

  signJwt(payload: any): string {
    return jwt.sign(payload, this.secret);
  }

  signRefreshToken(payload: any): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.refreshExp,
    });
  }
}

export const _jwtService = new JwtService();
