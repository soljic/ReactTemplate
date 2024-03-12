import React, {SyntheticEvent, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserActivity } from '../../app/models/profile';
import { format } from 'date-fns';
import { useStore } from "../../app/stores/store";
import {Notification} from "../../app/models/notification";
import { NotificationResponse } from 'src/app/models/notificationResponse';

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

export default observer(function ProfileNotifications() {
    const { profileStore, notificationStore, notificationResponsStore } = useStore();
    const[isLoading, setLoading] = useState(false);
    const {
     loadNotifications,
        notifications
    } = notificationStore;

    const {
        profile
    } = profileStore;

    const {
        notifications : notificationResponses 
    } = notificationResponsStore;
    // Dodajte ovu funkciju prije povratka iz komponente
   // Dodajte ovu funkciju prije povratka iz komponente
const handleResponse = async (accepted: boolean, notificationId: number) => {
    try {
        const notificationArray = notifications.slice();
        const notification = await notificationArray.find((n) => n.id === notificationId);
 
        if (notification && notificationStore.hubConnection?.state === 'Connected') {
            const responseObj: NotificationResponse = {
                accepted: accepted,
                mediaType: "movie", // Prilagodite prema vašim potrebama
                responsePersonId: "168ae4c6-bf15-47bf-9191-9d360aa62f22",
                dateNightId: 32
            };
            console.log("responseObj", responseObj);
            // Pošaljite odgovor na notifikaciju
            await notificationStore.sendNotificationResponse(responseObj);
            console.log("responseObj23", responseObj);
            // Ažurirajte stanje notifikacija nakon odgovora
            notificationStore.updateNotificationResponse(notificationId, accepted);
        } else {
            console.error("Cannot send response, connection is not in the 'Connected' state.");
        }
    } catch (error) {
        console.error("Error handling response:", error);
    }
 };
 
    


    useEffect(() => {
        notificationStore.createHubConnection(profile!.username);
        notificationResponsStore.createHubConnection(profile!.username);
       // let res =  loadNotifications();
       // let result = res.then(r =>  console.log("result", r));

       // if(result != null){
       //     setLoading(false);
       //     return;
       // }
       // setLoading(true)
        return () =>{
            notificationStore.clearNotifications();
        }
    }, [notificationStore,notificationResponsStore, profile]);

    return (
        <Tab.Pane loading={isLoading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Notifications'} />
                </Grid.Column>
                <Grid.Column width={16}>

                    <Card.Group itemsPerRow={4}>
                        {notifications.map((notification: Notification) => (
                            <Card
                                as={Link}
                                to={`/profiles/${profile!.username}`}
                                key={notification.id}
                            >
                               <Card.Content>
                                    <Card.Header textAlign='center'>{notification.body}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        {/* Dodajte gumb "Yes" koji poziva odgovarajuću funkciju */}
                                        <button onClick={() => handleResponse(true, notification.id)}>Yes</button>
                                        {/* Dodajte gumb "No" koji poziva odgovarajuću funkciju */}
                                        <button onClick={() => handleResponse(false, notification.id)}>No</button>
                                    </Card.Meta>
                                    <div>Created by: {profile!.username}</div>
                                </Card.Content>

                            </Card>
                        ))}
                    </Card.Group>
                    {/* <Card.Group itemsPerRow={4}>
                        {notificationResponses.map((notificationResponse: NotificationResponse) => (
                            <Card
                                as={Link}
                                to={`/profiles/${profile!.username}`}
                                key={notificationResponse.dateNightId}
                            >
                               <Card.Content>
                                    <Card.Header textAlign='center'>{notification.mediaType}</Card.Header>
                                    <div>Created by: {profile!.username}</div>
                                </Card.Content>

                            </Card>
                        ))}
                    </Card.Group> */}


                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});