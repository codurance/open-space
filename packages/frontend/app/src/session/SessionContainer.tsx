import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as sessionAPI from "./api/sessionAPI";
import "./SessionContainer.css";
import SessionsFilters from "./sessionFilters/SessionFilters";
import SessionForm from "./sessionForm/SessionForm";
import Sessions from "./Sessions";
import SessionsContext, { ISessionsContext, ISessionsState } from "./sessionsContext";
import sessionsReducer from "./sessionsReducer";

const SessionContainer: React.FC = () => {
  const context: ISessionsContext = useContext(SessionsContext);
  const [state, dispatch] = useReducer(sessionsReducer, context.state);

  const getSessionResponse = async () => {
    const sessionsResult = await sessionAPI.getSessions();
    dispatch({"setSessions", sessionsResult});
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
    <SessionsContext.Provider value={{state, dispatch}}>
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
