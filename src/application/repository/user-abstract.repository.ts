import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../usecases/users/dto/create-user.dto";
import { UpdateUserDto } from "../usecases/users/dto/update-user.dto";

export abstract class UserAbstractRepository {
    abstract findAll(): Promise<UserEntity[]>;
    abstract findById(id: number): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity>;
    abstract create(data: CreateUserDto): Promise<void>;
    abstract update(id: number, data: UpdateUserDto): Promise<void>;
    abstract remove(id: number): Promise<void>;
}