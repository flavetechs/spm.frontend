import { HubConnection } from "@microsoft/signalr";

const getHubInstance = async () => {
    const connectionAsString = sessionStorage.getItem('hubConnection');
    const hubConnection: HubConnection = JSON.parse(connectionAsString ?? "");
    return hubConnection;
}

export default getHubInstance;