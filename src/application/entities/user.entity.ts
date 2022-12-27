import { 
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn 
} from "typeorm";
import { hashSync } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    office: string;

    @Column()
    birthday: Date;

    @Column()
    situation: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created-at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated-at' })
    updatedAt: Date;

    @Column({ name: 'reset-token', length: 80 })
    resetToken: string;

    @Column({ name: 'reset-token-expires', length: 80 })
    resetTokenExpires: string;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }

    constructor(user?: Partial<UserEntity>) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.office = user?.office;
        this.birthday = user?.birthday;
        this.situation = user?.situation;
        this.password = user?.password;
        this.createdAt = user?.createdAt;
        this.updatedAt = user?.updatedAt;
        this.resetToken = user?.resetToken;
        this.resetTokenExpires = user?.resetTokenExpires;
    }
}