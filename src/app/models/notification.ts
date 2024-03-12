import {Profile} from "./profile";

export interface Notification {
    id: number;
    createdAt: Date;
    body: string;
    author: Profile;
    receiever: Profile;
    partnerId?: string;
    dateNightId?: number
}