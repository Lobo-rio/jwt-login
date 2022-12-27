import { Inject, Injectable } from "@nestjs/common";

import { UserAbstractRepository } from "../../../application/repository/user-abstract.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject("UserAbstractRepository")
        private readonly userRepository: UserAbstractRepository
    ) {}

    async findAll() {
        return await this.userRepository.findAll();
    }

    async findById(id: number) {
        return await this.userRepository.findById(id);
    }

    async create(data: CreateUserDto) {
        return await this.userRepository.create(data);
    }

    async update(id: number, data: UpdateUserDto) {
        return await this.userRepository.update(id, data);
    }

    async remove(id: number) {
        return await this.userRepository.remove(id);
    }
}