import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getUserDetails } from "../utils/permissions";
export const connectToHub = async (room) => {
    try {
        var user = getUserDetails().userName;
        console.log('user', user);
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44373/comments")
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("AddComment", (user, message) => {
            console.log("Message received", message);
        });

        await connection.start();
        await connection.invoke("JoinCommentRoom", { user, room });
        return connection;
    } catch (error) {
        console.log(error);
    }
}

export const connectToNotificationHub = async (room) => {
    try {
        var user = getUserDetails().userName;
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44373/hubs/comments")
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("NotificationArea", (user, message) => {
            console.log("Message received", message);
        });

        await connection.start();
        await connection.invoke("JoinNotificationRoom", { user, room });
        return connection;
    } catch (error) {
        console.log(error);
    }
}

export const connectToCommentRoom = async (room) => {
    try {
        const token = localStorage.getItem('token'); 
        const user = getUserDetails().userName;
        console.log('user', user);
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44373/hubs/comments", { accessTokenFactory: () => token })
            .configureLogging(LogLevel.Information)
            .build();

        connection.on("CommentArea", (user, message) => {
            console.log("Message received", message);
        });

        await connection.start();
        await connection.invoke("JoinCommentRoom", { user, room });
        return connection;
    } catch (error) {
        console.log(error);
    }
}
