import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

import Sessions from "./Sessions";
import SessionForm from "./sessionForm/SessionForm";
import CSS from "csstype";
import * as sessionAPI from "./api/sessionAPI";

export interface ISession {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
}

const SessionsContext = React.createContext({
  sessions: []
});

const SessionContainer: React.FC = () => {
  const [sessions2, setSessions] = useContext(SessionsContext);

  //const [sessions, setSessions] = useState();
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

  const modalStyle: CSS.Properties = {
    background: "#666666"
  };

  return (
    <>
      <div className="session-buttons">
        <Button className="add-session-button" onClick={() => onAddSession()}>
          Add session
        </Button>
        <Button icon onClick={() => toggleFilterByInterest(!filterByInterest)}>
          <Icon name="heart" />
          Filter by Interest
        </Button>
      </div>
      <Modal open={isModalSessionOn}>
        <Modal.Header>Session</Modal.Header>
        <Modal.Content style={modalStyle}>
          <SessionForm
            getSessions={getSessionResponse}
            sessionToEdit={sessionData}
            setIsEditing={setModalSessionOn}
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
