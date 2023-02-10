import "reflect-metadata"

import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DataSource } from "typeorm";
import { connect } from "mssql";
import { Users } from "../entities/Users.entity";
import { WorkDevices } from "../entities/WorkDevices.entity";
import { appDataSource } from "../entities/initDataSource";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    await appDataSource.initialize();
    const users = await appDataSource.manager.find(Users);

    context.res = {
        status: 200, /* Defaults to 200 */
        body: {
            msg: "success",
            data: users,
        },
    };

    await appDataSource.destroy();
};

export default httpTrigger;