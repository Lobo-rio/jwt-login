import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

import { CreateUserDto } from "../../../application/usecases/users/dto/create-user.dto";
import { UpdateUserDto } from "../../../application/usecases/users/dto/update-user.dto";

import { MessagesError } from "../../../helppers/message/message-error";

import { UserEntity } from "../../../application/entities/user.entity";
import { UserAbstractRepository } from "../../../application/repository/user-abstract.repository";

@Injectable()
export class UserRepository implements UserAbstractRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            select: ['id', 'name', 'email', 'office', 'birthday', 'situation', 'createdAt'],
        });
    }
    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ 
            select: ['id', 'name', 'email', 'office', 'birthday', 'situation', 'createdAt'],
            where: { id }
        });

        if (!user) {
            throw new NotFoundException(MessagesError.USER_NOT_EXISTED);
        }

        return user;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    async create(data: CreateUserDto): Promise<void> {
        const user = await this.findByEmail(data.email);
        if (user) {
            throw new NotFoundException(MessagesError.EMAIL_EXISTED);
        }
        await this.userRepository.save(
            this.userRepository.create(data)
        );
    }

    async update(id: number, data: UpdateUserDto): Promise<void> {
        const user = await this.findById(id);
        this.userRepository.merge(user, data);
        await this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.findById(id);
        await this.userRepository.delete({ id });
    }

}