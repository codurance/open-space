import React, { useEffect, useState } from "react";
import { Grid, Button, Icon } from "semantic-ui-react";
import Sessions from "./Sessions";
import SessionForm from "./sessionForm/SessionForm";
import * as sessionAPI from "./api/sessionAPI";
import SessionsContext from "./sessionsContext";
import SessionsFilters from "./sessionFilters/SessionFilters";

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
      <Grid className="session-buttons" columns="equal">
        <Grid.Row>
          <Grid.Column width={16}>
            <Button
              className="add-session-button"
              onClick={() => onAddSession()}
            >
              Add session
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button
              icon
              onClick={() => toggleFilterByInterest(!filterByInterest)}
            >
              <Icon name="heart" />
              Filter by Interest
            </Button>
            <SessionsFilters />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {currentSession !== undefined && <SessionForm />}
      <Sessions isFilteringByInterest={filterByInterest} />
    </SessionsContext.Provider>
  );
};

export default SessionContainer;
