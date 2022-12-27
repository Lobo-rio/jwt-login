import { UsersEntity } from "src/application/entities/user.entity";
import { UserAbstractRepository } from "../../../application/repository/user-abstract.repository";

export class UserRepository implements UserAbstractRepository {
    findAll(): Promise<UsersEntity[]> {
        throw new Error("Method not implemented.");
    }
    findOneOrFail(conditions: any, options?: any): Promise<UsersEntity> {
        throw new Error("Method not implemented.");
    }
    create(data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}