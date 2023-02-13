import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { appDataSource } from "../entities/initDataSource";
import { Users } from "../entities/Users.entity";
import { WorkDevices } from "../entities/WorkDevices.entity";

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

    try {
        const user = await appDataSource.manager.findOne(Users, {
            where: {
                userId,
            }
        });
        const workDevice = await appDataSource.manager.findOne(WorkDevices, {
            where: {
                userId,
            }
        });
        context.log(user);
        if (!user) {
                context.res = {
                    status: 400,
                    body: {
                        msg: "bad_request",
                        data: {},
                    },
                };
                await appDataSource.destroy();

                return;
        }
        
        if (workDevice) {
            await appDataSource.manager.delete(WorkDevices, workDevice);
        }
        await appDataSource.manager.delete(Users, user);
        
        context.res = {
            status: 200, /* Defaults to 200 */
            body: {
                msg: "success",
                data: {
                    userId,
                },
            },
        };
    } catch (error) {
        context.log(error);
        context.res = {
            status: 500, /* Defaults to 200 */
            body: {
                msg: "error",
                data: JSON.stringify(error),
            },
        };
    }
    await appDataSource.destroy();
};

export default httpTrigger;