import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import * as sessionAPI from "./api/sessionAPI";
import "./SessionContainer.css";
import SessionsFilters from "./sessionFilters/SessionFilters";
import SessionForm from "./sessionForm/SessionForm";
import Sessions from "./Sessions";
import SessionsContext, { ISessionsContext, ISession } from "./sessionsContext";
import sessionsReducer from "./sessionsReducer";

const SessionContainer: React.FC = () => {
  const context: ISessionsContext = useContext(SessionsContext);
  const [state, dispatch] = useReducer(sessionsReducer, context.state);

  const [filterByInterest, toggleFilterByInterest] = useState(false);

  const getSessionResponse = async () => {
    const updatedSessions: ISession[] = ((await sessionAPI.getSessions()) as unknown) as ISession[];
    if (updatedSessions) {
      dispatch({ type: "setSessions", payload: updatedSessions });
    }
  };

  const onAddSession = () => {
    const newSession: ISession = {
      id: -1,
      title: "",
      time: "",
      presenter: ""
    };
    dispatch({ type: "setCurrentSession", payload: newSession! });
  };

  useEffect(() => {
    getSessionResponse();
  }, []);

  return (
    <SessionsContext.Provider value={{ state, dispatch }}>
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
      {state.currentSession !== undefined && <SessionForm />}
      <Sessions isFilteringByInterest={filterByInterest} />
    </SessionsContext.Provider>
  );
};

export default SessionContainer;
