import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Users } from "../entities/Users.entity";
import { WorkDevices } from "../entities/WorkDevices.entity";
import { DataSource } from "typeorm";
import { appDataSource } from "../entities/initDataSource";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const body = req.body;
    const userId = parseInt(req.query && req.query.userId);
    
    if (!body || !body.fullName || !body.address || !body.city || !userId) {
        context.res = {
            status: 400,
            body: {
                msg: "bad_request",
                data: {},
            },
        };
        return;
    }

    await appDataSource.initialize();

    const user = await appDataSource.manager.findOne(Users, {
        where: {
            userId: userId,
        }
    });
    user.fullName = body.fullName;
    user.address = body.address;
    user.city = body.city;
    await appDataSource.manager.save(user);
    
    context.res = {
        status: 200, /* Defaults to 200 */
        body: {
            msg: "success",
            data: user,
        },
    };
    await appDataSource.destroy();
};

export default httpTrigger;