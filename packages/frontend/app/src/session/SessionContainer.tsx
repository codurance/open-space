import React, { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as sessionAPI from "./api/sessionAPI";
import SessionsFilters from "./sessionFilters/SessionFilters";
import SessionForm from "./sessionForm/SessionForm";
import Sessions from "./Sessions";
import SessionsContext from "./sessionsContext";
import "./SessionContainer.css";
import "../logout/logoutButton.css";
import * as localStorageHelper from "../common/localStorageHelper";
import { GoogleLogout } from "react-google-login";

const SessionContainer: React.FC = () => {
  const [sessions, setSessions] = useState();
  const [currentSession, setCurrentSession] = useState();
  const [filterByInterest, toggleFilterByInterest] = useState(false);
  const [sessionTypesToFilter, setSessionTypesToFilter] = useState([]);

  const getSessionResponse = async () => {
    const sessionsResult = await sessionAPI.getSessions();
    setSessions(sessionsResult);
  };

  const checkIfLoggedIn: Function = (): Promise<void> => {
    return new Promise(resolve => {
      localStorageHelper.isUserLoggedIn().then((answer: Boolean) => {
        if (!answer) document.location.href = "/login";
        resolve();
      });
    });
  };

  useEffect(() => {
    checkIfLoggedIn().then(() => getSessionResponse());
  }, []);

  const onAddSession = () => {
    const session = {
      title: "",
      location: "",
      time: "",
      presenter: ""
    };

    setCurrentSession(session);
  };

  const logout = () => {
    localStorage.clear();
    document.location.href = "/";
  };

  return (
    <SessionsContext.Provider
      value={{
        sessions,
        setSessions,
        currentSession,
        setCurrentSession,
        sessionTypesToFilter,
        setSessionTypesToFilter
      }}
    >
      <div className="session-buttons button-bar">
        <Button className="add-session-button" onClick={() => onAddSession()}>
          Add session
        </Button>
        <Button
          positive={filterByInterest}
          icon
          onClick={() => toggleFilterByInterest(!filterByInterest)}
        >
          <Icon as="i" name="heart" style={{ letterSpacing: 2 }} />
          Filter by Interest
        </Button>
        <SessionsFilters />
        <GoogleLogout
          clientId="1004102739157-02ek62abehjg70tb9fh865j2c8krclhc.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </div>

      {currentSession !== undefined && <SessionForm />}
      <Sessions isFilteringByInterest={filterByInterest} />
    </SessionsContext.Provider>
  );
};

export default SessionContainer;
