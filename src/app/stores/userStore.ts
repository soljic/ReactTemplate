import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Route";
import { store } from "./store";
import GoogleApi from "react-google-login"
import { get } from "http";

declare global {
    interface Window {
      gapi: any; // GoogleApi je sučelje koje opisuje strukturu gapi objekta
    }
  }

export default class UserStore {
    user: User | null = null;
    fbAccessToken: string | null = null;
    fbLoading = false;
    googleAccessToken: string | null = null;
    googleLoading = false;
    refreshTokenTimeout: any;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
          const user =   await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            router.navigate(`/account/registerSuccess?email=${creds.email}`);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    } 

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

  /*  getFacebookLoginStatus = async () => {
        window.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.fbAccessToken = response.authResponse.accessToken;
            }
        })
    }*/

    getGoogleLoginStatus = async () => {
        // Provjerite je li Google API učitan
        if (window.gapi && window.gapi.auth2) {
            // Dohvati instancu Google autentikacije
            const authInstance = window.gapi.auth2.getAuthInstance();
          
            // Provjeri je li korisnik prijavljen
            if (authInstance && authInstance.isSignedIn.get()) {
                // Dohvati trenutnog korisnika
                const user = authInstance.currentUser.get();
          
                // Provjerite je li korisnik prijavljen prije nego što pokušate dohvatiti pristupni token
                if (user && user.getAuthResponse()) {
                    // Dohvati Google pristupni token
                    this.googleAccessToken = user.getAuthResponse().access_token;
          
                    // Ovdje možete dalje obrađivati Google pristupni token
                    console.log('Google Access Token:', this.googleAccessToken);
                }
            }
        }
    };
      

    facebookLogin = () => {
        this.fbLoading = true;
        const apiLogin = (accessToken: string) => {
            agent.Account.fbLogin(accessToken).then(user => {
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user);
                runInAction(() => {
                    this.user = user;
                    this.fbLoading = false;
                })
                router.navigate('/activities');
            }).catch(error => {
                console.log(error);
                runInAction(() => this.fbLoading = false);
            })
        }
        if (this.fbAccessToken) {
            apiLogin(this.fbAccessToken);
        } else {
            window.FB.login(response => {
                apiLogin(response.authResponse.accessToken);
            }, {scope: 'public_profile,email'})
        }
    }

    googleLogin = () => {
        this.getGoogleLoginStatus();
        this.googleLoading = true;
        const apiLogin = (accessToken: string) => {
            agent.Account.googleLogin(accessToken).then(user => {
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user);
                runInAction(() => {
                    this.user = user;
                    this.googleLoading = false;
                })
                router.navigate('/activities');
            }).catch(error => {
                console.log(error);
                runInAction(() => this.fbLoading = false);
            })
        }
        if (this.googleAccessToken) {
            apiLogin(this.googleAccessToken);
        } else {
            this.getGoogleLoginStatus();
        }
    }


    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: User) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}

function getFacebookLoginStatus() {
    throw new Error("Function not implemented.");
}
