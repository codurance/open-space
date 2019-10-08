import React, { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as sessionAPI from "./api/sessionAPI";
import SessionsFilters from "./sessionFilters/SessionFilters";
import SessionForm from "./sessionForm/SessionForm";
import Sessions from "./Sessions";
import SessionsContext from "./sessionsContext";
import "./SessionContainer.css";

const SessionContainer: React.FC = () => {
  const [sessions, setSessions] = useState();
  const [currentSession, setCurrentSession] = useState();
  const [filterByInterest, toggleFilterByInterest] = useState(false);
  const [sessionTypesToFilter, setSessionTypesToFilter] = useState([]);

  const getSessionResponse = async () => {
    const sessionsResult = await sessionAPI.getSessions();
    setSessions(sessionsResult);
  };

  useEffect(() => {
    getSessionResponse();
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
      <div className="session-buttons">
        <Button className="add-session-button" onClick={() => onAddSession()}>
          Add session
        </Button>
      </div>
      <div>
        <Button icon onClick={() => toggleFilterByInterest(!filterByInterest)}>
          <Icon name="heart" />
          Filter by Interest
        </Button>

        <SessionsFilters />
      </div>
      {currentSession !== undefined && <SessionForm />}
      <Sessions isFilteringByInterest={filterByInterest} />
    </SessionsContext.Provider>
  );
};

export default SessionContainer;
