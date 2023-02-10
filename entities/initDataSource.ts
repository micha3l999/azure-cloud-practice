import { DataSource } from "typeorm";
import { Users } from "./Users.entity";
import { WorkDevices } from "./WorkDevices.entity";

export const appDataSource = new DataSource({
    type: "mssql",
    host: process.env["SqlHost"],
    port: Number(process.env["SqlPort"]),
    username: process.env["SqlUserName"],
    password: process.env["SqlPassword"],
    database: process.env["SqlDatabase"],
    synchronize: false, 
    authentication: {
        type: "default",
        options: {
            userName: process.env["SqlUserName"],
            password: process.env["SqlPassword"],
        }
    },
    options: {
        encrypt: true,
    },
    entities: [
        Users,
        WorkDevices,
    ],
});