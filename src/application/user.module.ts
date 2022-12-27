import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../infra/database/repositories/user.repository';
import { UserController } from '../infra/http/controllers/user.controller';

import { UserEntity } from './entities/user.entity';
import { UserService } from './usecases/users/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
    UserService,
    {
      provide: "UserAbstractRepository",
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}