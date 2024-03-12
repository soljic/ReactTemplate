import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { NotificationResponse } from "../models/notificationResponse";
import { Notification } from "../models/notification";
import { store } from "./store";

export default class NotificationResponseStore {
    constructor() {
        makeAutoObservable(this);
    }

    notificationResponse: NotificationResponse[] = [];
    notifications:Notification[] = [];
    hubConnection: HubConnection | null = null;

    createHubConnection = (userName: string) => {
        console.log('createHubConnectionURL:',process.env.REACT_APP_NOTIFICATION_RESPONSE_URL); 
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_NOTIFICATION_RESPONSE_URL + '?userName=' + userName, {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));

        this.hubConnection.on('LoadNotification', (notifications: Notification[]) => {
            console.log("NotificationONE");
            runInAction(() => {
                notifications.forEach(notification => {
                    notification.createdAt = new Date(notification.createdAt + 'Z');
                    console.log("Notification", notification);
                })
                this.notifications = notifications
                console.log("Notification",  this.notifications);
            });
        })

        this.hubConnection.on('ReceiveNotification', (notification: Notification) => {
            runInAction(() => {
                console.log("Notification", notification);
                notification.createdAt = new Date(notification.createdAt);
                this.notifications.unshift(notification)
            });
        })
    };

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    };

    clearNotificationResponses = () => {
        this.notifications = [];
        this.stopHubConnection();
    };

    sendNotificationResponse = async (response: NotificationResponse, notificationId: number) => {
        try {
            console.log('Pokušaj invoke:', response, notificationId); // Dodajte ovu liniju
            await this.hubConnection?.invoke('SendNotificationResponse', response, notificationId);
            console.log('Invoke uspješan');
        } catch (error) {
            console.log("Error sending notification response:", error);
            throw error;
        }
    };
    
}
