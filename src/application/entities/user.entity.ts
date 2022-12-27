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
export class UsersEntity {
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
}