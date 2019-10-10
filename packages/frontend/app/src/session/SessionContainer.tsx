import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as sessionAPI from "./api/sessionAPI";
import "./SessionContainer.css";
import SessionsFilters from "./sessionFilters/SessionFilters";
import SessionForm from "./sessionForm/SessionForm";
import Sessions from "./Sessions";
import SessionsContext, { ISessionsContext } from "./sessionsContext";
import sessionsReducer from "./sessionsReducer";

const SessionContainer: React.FC = () => {
  const initialState: ISessionsContext = useContext(SessionsContext);
  const [state, dispatch] = useReducer(sessionsReducer, initialState);

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
    <SessionsContext.Provider>
      <div className="session-buttons">
        <Button className="add-session-button" onClick={() => onAddSession()}>
          Add session
        </Button>
      </div>
      <div>
        <Button
          positive={filterByInterest}
          icon
          onClick={() => toggleFilterByInterest(!filterByInterest)}
        >
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
