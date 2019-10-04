import React, { useEffect, useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

import Sessions from "./Sessions/Sessions";
import SessionForm from "./sessionForm/SessionForm";
import "./SessionsContainer.css";
import * as sessionAPI from "./sessionService/sessionAPI";

export interface ISession {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
}

const SessionContainer: React.FC = () => {
  const [sessions, setSessions] = useState();
  const [isModalSessionOn, setModalSessionOn] = useState(false);
  const [sessionData, setSessionData] = useState();
  const [filterByInterest, toggleFilterByInterest] = useState(false);

  const getSessionResponse = async () => {
    const sessions = await sessionAPI.getSessions();
    setSessions(sessions);
  };

  useEffect(() => {
    getSessionResponse();
  }, []);

  const onAddSession = () => {
    setModalSessionOn(true);
    const session = {
      title: "",
      location: "",
      time: "",
      presenter: ""
    };

    setSessionData(session);
  };

  return (
    <>
      <div className="session-buttons">
        <Button onClick={() => onAddSession()}>Add session</Button>
        <Button icon onClick={() => toggleFilterByInterest(!filterByInterest)}>
          <Icon name="heart" />
          Filter by Interest
        </Button>
      </div>
      <Modal open={isModalSessionOn}>
        <Modal.Header>Session</Modal.Header>
        <Modal.Content>
          <SessionForm
            getSessions={getSessionResponse}
            sessionToEdit={sessionData}
            setModalSessionOn={setModalSessionOn}
          />
        </Modal.Content>
      </Modal>
      <Sessions
        sessions={sessions}
        setIsEditing={setModalSessionOn}
        isEditing={isModalSessionOn}
        setSessionToEdit={setSessionData}
        getSessions={getSessionResponse}
        isFilteringByInterest={filterByInterest}
      />
    </>
  );
};

export default SessionContainer;
