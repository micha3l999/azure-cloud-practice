import { AzureFunction, Context } from "@azure/functions"
import { appDataSource } from "../entities/initDataSource";
import { WorkDevices } from "../entities/WorkDevices.entity";
import { Users } from "../entities/Users.entity";

const DEFAULT_DEVICE = {
    brand: "msi",
    status: 1,
    description: "MSI gamer laptop"
};

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    context.log('Timer trigger function processed a request.');

    await appDataSource.initialize();
    const workDevices = await appDataSource.manager.find(WorkDevices);
    const users = await appDataSource.manager.find(Users);
    if (users.length >= workDevices.length) {
        const reaminingDevicesUsers = users.filter(user => !workDevices.find(device => device.userId == user.userId));

        for(let i = 0; i < reaminingDevicesUsers.length; i++) {
            const workDevice = new WorkDevices();
            workDevice.brand = DEFAULT_DEVICE.brand;
            workDevice.description = DEFAULT_DEVICE.description;
            workDevice.status = DEFAULT_DEVICE.status;
            workDevice.userId = reaminingDevicesUsers[i].userId;

            await appDataSource.manager.save(workDevice);
        }
        context.log("Successfully updated work devices");
    } else {
        context.log("No work devices to deliver to users");
    }

    await appDataSource.destroy();
};

export default timerTrigger;
