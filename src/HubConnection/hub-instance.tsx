import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getUserDetails } from "../utils/permissions";
import { IUser } from "./Models/User";

const hubInstance = async () => {
    try {
        var user: IUser = getUserDetails();
        const connection = new HubConnectionBuilder()
            .withUrl("http://flavetechs.com/smp/development/hubs/pushnotification")
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("NotificationArea", ( message : any) => {
             console.log("Message received" + user.userId, message);
        });

        await connection.start();
        await connection.invoke("JoinNotificationRoom", { userId: user.userId });

        return connection;
    } catch (error: any) {
        console.log(error);
        return HubConnection;
    }
}

export default hubInstance;


