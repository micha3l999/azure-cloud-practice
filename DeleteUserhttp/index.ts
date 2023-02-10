import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { appDataSource } from "../entities/initDataSource";
import { Users } from "../entities/Users.entity";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const userId = parseInt(req.query && req.query.userId);
    
    if (!userId) {
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
            userId,
        }
    })
    const response = await appDataSource.manager.delete(Users, user);
    
    context.res = {
        status: 200, /* Defaults to 200 */
        body: {
            msg: "success",
            data: {
                userId,
            },
        },
    };
    await appDataSource.destroy();
};

export default httpTrigger;