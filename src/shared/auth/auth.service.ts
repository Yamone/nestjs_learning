import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user): Promise<string> {
    return await this.jwtService.signAsync({ user });
  }
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
  async comparePassword(password: string, passwordhash: string) {
    return await bcrypt.compare(password, passwordhash);
  }
}
