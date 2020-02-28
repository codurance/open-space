import React, { useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { User } from "../../common/User";
import * as localStorageHelper from "../../common/localStorageHelper";

/*
 * This GoogleLogin is basically a wrapper over Google OAuth2 API
 * It'll do some conversion for response, but that's not well documented anywhere.
 * So just treat this response as a GoogleUser
 * Check https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile
 */

const LoginContent: React.FC = () => {
  const [isFailedLogin, setIsFailedLogin] = useState();

  const loginMessage = isFailedLogin ? (
    <p>Wrong email address! Please use your Codurance email account!</p>
  ) : (
    <p>Login with your Codurance account here:</p>
  );

  const successGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const profile = (response as GoogleLoginResponse).getBasicProfile();
    const user: User = {
      id: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName()
    };
    localStorageHelper.storeUserInformation(user);
    document.location.assign("/");
  };

  const failureGoogle = (response: any) => {
    setIsFailedLogin(true);
  };

  return (
    <div>
      {loginMessage}
      <GoogleLogin
        className="googleButtonLogin"
        clientId="1004102739157-02ek62abehjg70tb9fh865j2c8krclhc.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successGoogle}
        onFailure={failureGoogle}
        cookiePolicy={"single_host_origin"}
        hostedDomain="codurance.com"
      />
    </div>
  );
};

export default LoginContent;
