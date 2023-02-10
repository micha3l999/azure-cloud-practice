import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn({ name: "user_id" }) 
    userId: number;

    @Column({ name: "full_name" })
    fullName: string;

    @Column()
    address: string;

    @Column()
    city: string;
}