import React from "react";
import { GoogleLogin } from "react-google-login";
import { User } from "../../common/User";
import * as localStorageHelper from "../../common/localStorageHelper";

const successGoogle = (response: any) => {
  const user: User = {
    id: response.profileObj.googleId,
    email: response.profileObj.email,
    name: response.profileObj.name
  };
  localStorageHelper.storeUserInformation(user);
  document.location.href = "/";
};

const failureGoogle = (response: any) => {
  console.log(response);
};

const LoginContent: React.FC = () => {
  return (
    <div>
      <p>Login with your codurance account here:</p>
      <GoogleLogin
        className="googleButtonLogin"
        clientId="1004102739157-02ek62abehjg70tb9fh865j2c8krclhc.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successGoogle}
        onFailure={failureGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginContent;
