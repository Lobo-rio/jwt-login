import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../infra/database/repositories/user.repository';
import { AuthController } from '../infra/http/controllers/auth.controller';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './usecases/auth/auth.service';
import { JwtStrategy } from './usecases/auth/strategies/jwt.strategy';
import { LocalStrategy } from './usecases/auth/strategies/local.strategy';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: "UserAbstractRepository",
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}