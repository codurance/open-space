import { GoogleLogout } from "react-google-login";
import React, { useEffect, useState } from "react";
import * as localStorageHelper from "../common/localStorageHelper";
import { User } from "../common/User";
import "./header.css";

const logout = () => {
  localStorage.clear();
  document.location.href = "/";
};

const Header: React.FC = () => {
  const [name, setName] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    localStorageHelper.retrieveUserInformation().then((userInfo: User) => {
      setName(userInfo.name);
    });
    setIsLoggedIn(localStorage.getItem("userId"));
  }, []);

  return (
    <header className="App-header">
      <h1 className="OpenSpace">OpenSpace</h1>

      <div className="name-and-logout">
        <div className="name">{name}</div>

        {isLoggedIn && (
          <GoogleLogout
            clientId="1004102739157-02ek62abehjg70tb9fh865j2c8krclhc.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          ></GoogleLogout>
        )}
      </div>
    </header>
  );
};

export default Header;
