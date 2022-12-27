import { Inject, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../../../application/entities/user.entity';
import { UserAbstractRepository } from '../../../application/repository/user-abstract.repository';

interface userAuth {
    id: number;
    email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject("UserAbstractRepository")
    private readonly userRepository: UserAbstractRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: userAuth) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}