import { GoogleLogout } from "react-google-login";
import React, { useEffect, useState } from "react";
import * as localStorageHelper from "../common/localStorageHelper";
import { User } from "../common/User";

const logout = () => {
  localStorage.clear();
  document.location.href = "/";
};

const Header: React.FC = () => {
  const [name, setName] = useState();
  useEffect(() => {
    localStorageHelper.retrieveUserInformation().then((userInfo: User) => {
      setName(<div className="userName">{userInfo.name}</div>);
    });
  }, []);

  return (
    <header className="App-header">
      <h1 className="OpenSpace">OpenSpace</h1>

      {name}

      <GoogleLogout
        className="logout-button"
        clientId="1004102739157-02ek62abehjg70tb9fh865j2c8krclhc.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </header>
  );
};

export default Header;
