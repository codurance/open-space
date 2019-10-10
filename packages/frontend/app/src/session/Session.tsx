import React, { useState, useContext } from "react";
import { deleteSession } from "../common/http";
import { Button, Card, Icon } from "semantic-ui-react";
import * as sessionsLocalStorage from "../common/sessionsLocalStorage";
import SessionsContext, { ISession } from "./sessionsContext";
import * as sessionAPI from "./api/sessionAPI";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
};

export const Session = ({
  id,
  title,
  location,
  time,
  presenter
}: SessionProps) => {
  const { setSessions, setCurrentSession, sessions } = useContext(
    SessionsContext
  );

  const [interest, setInterest] = useState(
    sessionsLocalStorage.checkInterest(id)
  );

  const onEditClicked = (id: number) => {
    const session: ISession = sessions.find(s => s.id === id)!;
    setCurrentSession(session);
  };

  const deleteSessionById = async () => {
    await deleteSession(`/api/sessions/${id}`);
    const updatedSessions = await sessionAPI.getSessions();
    if (updatedSessions) setSessions(updatedSessions);
  };

  const toggleInterest = () => {
    setInterest(!interest);
    sessionsLocalStorage.setInterest(id, !interest);
  };

  return (
    <Card className="session" fluid>
      <Card.Content>
        <Card.Header className="session-title">{title}</Card.Header>
        <Card.Description className="session-presenter">
          <Icon name="user" />
          {presenter}
        </Card.Description>
      </Card.Content>
      <Card.Content extra className="session-extra-details">
        {location} @ {time}
      </Card.Content>
      <Card.Content>
        <Button icon onClick={() => toggleInterest()}>
          <Icon name={interest ? "heart" : "heart outline"} />
        </Button>
        <Button
          className="delete-session"
          icon
          onClick={() => deleteSessionById(id)}
        >
          <Icon name="trash" />
        </Button>
        <Button className="edit-session" onClick={() => onEditClicked(id)}>
          Edit
        </Button>
      </Card.Content>
    </Card>
  );
};
