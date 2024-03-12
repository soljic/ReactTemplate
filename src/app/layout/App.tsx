import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import HomePage from '../../features/home/HomePage';
import Layout from './Layout';
import ShoppingCart from 'src/features/store/ShoppingCart';

function App() {

    const{activityStore,commonStore,userStore} = useStore();
    const location = useLocation();


    useEffect(() => {
        activityStore.loadActivities();
        if(commonStore.token){
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        }else{
            commonStore.setAppLoaded();
        }
    }, [activityStore,commonStore,userStore]);


    if (!commonStore.appLoaded) return <LoadingComponent content={'Loading component...'}/>
    return (
        <>
        <Layout>
        <ToastContainer position='bottom-right' hideProgressBar />
        <ModalContainer />
        
        {location.pathname === '/' ? <HomePage/>  : (
            <>
            <Container style={{ marginTop: '7em' }}>
            <Outlet />
            </Container>
            </>
        )}
       </Layout>
        </>
        
    );

}


export default observer(App);
