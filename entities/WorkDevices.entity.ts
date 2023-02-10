import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity()
export class WorkDevices {

    @PrimaryGeneratedColumn({ name: "device_id" })
    deviceId: number;

    @Column()
    brand: string;

    @Column()
    status: number;

    @Column()
    description: string;

    @OneToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    user: Users;

    @Column({ name: "user_id" })
    userId: number;
}