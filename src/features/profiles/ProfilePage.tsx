import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore, notificationStore } = useStore();
    const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
       if(username) loadProfile(username);
        console.log("NOTIFIKATIONS", notificationStore.notifications)
        if(username) notificationStore.createHubConnection(username);
        return () => {
            notificationStore.clearNotifications();
            setActiveTab(0);
        }
    }, [loadProfile, notificationStore, username, setActiveTab])

    if (loadingProfile) return <LoadingComponent content='Loading profile...' />

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>}
            </Grid.Column>
        </Grid>
    )
})