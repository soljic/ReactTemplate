import ShoppingCartStore from './shoppingCartStore';
import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";
import NotificationStore from "./notificationStore";
import NotificationResponseStore from './notificationResponseStore';

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
    notificationStore: NotificationStore;
    shoppingCartStore: ShoppingCartStore;
    notificationResponsStore: NotificationResponseStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    notificationStore: new NotificationStore(),
    shoppingCartStore: new ShoppingCartStore(),
    notificationResponsStore: new NotificationResponseStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}