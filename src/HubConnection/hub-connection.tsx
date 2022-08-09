import React from "react";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import { useEffect, useState } from "preact/hooks";

function Connection() {
    const hubConnection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Information).withUrl('http://localhost:3000/notifications').build();
    hubConnection.start();

    var list: string[] = [];

    interface Messageprops {
        HubConnection: signalR.HubConnection
    }

    const joinRoom = async ({user, room}: any) => {

        const [date, setDate] = useState<Date>();

        useEffect(() => {
            hubConnection.on('addNotification', (message: any) => {
                list.push(message);
            });
            setDate(new Date());
        });

    }
}

export default Connection;