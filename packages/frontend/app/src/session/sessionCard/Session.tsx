import React, { useState, useContext } from "react";
import { deleteSession } from "../../common/http";
import { Button, Card, Icon } from "semantic-ui-react";
import * as localStorageHelper from "../../common/localStorageHelper";
import SessionsContext, { ISession } from "../sessionsContext";
import * as sessionAPI from "../api/sessionAPI";
import SessionDeleteConfirmation from "./SessionDeleteConfirmation";
import "./Session.css";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
  type: string;
};

export const Session = ({
  id,
  title,
  location,
  time,
  presenter,
  type
}: SessionProps) => {
  const { setSessions, setCurrentSession, sessions } = useContext(
    SessionsContext
  );

  const [open, setOpen] = useState(false);

  const [interest, setInterest] = useState(
    localStorageHelper.checkInterest(id)
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
    localStorageHelper.setInterest(id, !interest);
    // refresh sessions
    setSessions([...sessions]);
  };

  return (
    <div>
      {open && (
        <SessionDeleteConfirmation
          onClose={() => setOpen(false)}
          onConfirm={() => deleteSessionById()}
        />
      )}
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
        <Card.Content extra className="session-type">
          A {type} session
        </Card.Content>
        <Card.Content>
          <Button icon onClick={() => toggleInterest()}>
            <Icon name={interest ? "heart" : "heart outline"} />
          </Button>
          <Button className="delete-session" icon onClick={() => setOpen(true)}>
            <Icon name="trash" />
          </Button>
          <Button
            className="edit-session"
            icon
            onClick={() => onEditClicked(id)}
          >
            <Icon name="pencil" />
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};
