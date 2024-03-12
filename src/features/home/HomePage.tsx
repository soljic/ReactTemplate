import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Segment,
  Image,
  Button,
  Divider,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import "./HomePage.css";
import GoogleLogin from "react-google-login";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <div className="segmentDiv">
      <div className="containerDiv">
        <h1 className="headerDiv">
          <Image
            size="medium"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Trivium Quiz
        </h1>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register!
            </Button>
            <Divider horizontal inverted>
              Or
            </Divider>
            <Button
              loading={userStore.fbLoading}
              size="huge"
              inverted
              color="facebook"
              content="Login with Facebook"
              onClick={userStore.facebookLogin}
            />
            <Divider horizontal inverted>
              Or
            </Divider>
            <GoogleLogin
              clientId="53313312754-bd0fggdjg166t90v43uak8ui4l0l51ju.apps.googleusercontent.com"
              buttonText="Prijava putem Google-a"
              onSuccess={userStore.googleLogin}
              onFailure={userStore.googleLogin}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              uxMode="popup"
              render={({ onClick, disabled }) => (
                <Button
                  loading={userStore.googleLoading}
                  size="huge"
                  inverted
                  color="google plus"
                  content="Login with Google"
                  onClick={onClick}
                />
              )}
            />
          </>
        )}
      </div>
    </div>
  );
});
