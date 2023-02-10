import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { appDataSource } from "../entities/initDataSource";
import { WorkDevices } from "../entities/WorkDevices.entity";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    await appDataSource.initialize();
    const workDevices = await appDataSource.manager.find(WorkDevices);

    context.res = {
        status: 200, /* Defaults to 200 */
        body: {
            msg: "success",
            data: workDevices,
        },
    };

    await appDataSource.destroy();
};

export default httpTrigger;