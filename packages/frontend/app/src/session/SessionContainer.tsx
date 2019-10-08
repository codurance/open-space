import React, { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import Sessions from "./Sessions";
import SessionForm from "./sessionForm/SessionForm";
import * as sessionAPI from "./api/sessionAPI";
import "./SessionContainer.css";
import SessionsContext from "./sessionsContext";

const SessionContainer: React.FC = () => {
  const [sessions, setSessions] = useState();
  const [currentSession, setCurrentSession] = useState();
  const [filterByInterest, toggleFilterByInterest] = useState(false);

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
      value={{ sessions, setSessions, currentSession, setCurrentSession }}
    >
      <div className="session-buttons">
        <Button className="add-session-button" onClick={() => onAddSession()}>
          Add session
        </Button>
        <Button icon onClick={() => toggleFilterByInterest(!filterByInterest)}>
          <Icon name="heart" />
          Filter by Interest
        </Button>
      </div>

      {currentSession !== undefined && <SessionForm />}
      <Sessions isFilteringByInterest={filterByInterest} />
    </SessionsContext.Provider>
  );
};

export default SessionContainer;
