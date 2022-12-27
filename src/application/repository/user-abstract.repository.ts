import { UsersEntity } from "../entities/user.entity";

export abstract class UserAbstractRepository {
    abstract findAll(): Promise<UsersEntity[]>;
    abstract findOneOrFail(
        conditions: any,
        options?: any
    ): Promise<UsersEntity>;
    abstract create(data: any): Promise<void>;
    abstract update(id: number, data: any): Promise<void>;
    abstract remove(id: string): Promise<void>;
}