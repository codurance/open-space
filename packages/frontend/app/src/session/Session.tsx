import React, { useState } from "react";
import { deleteSession } from "../common/http";
import { Button, Card, Icon } from "semantic-ui-react";
import * as sessionsLocalStorage from "../common/sessionsLocalStorage";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
  getSessions?: Function;
  onEditClicked: Function;
  isEditing: boolean;
};

const deleteSessionById = async (
  id: Number,
  getSessions: Function | undefined
) => {
  await deleteSession(`/api/sessions/` + id).then(() => {
    if (getSessions !== undefined) getSessions();
  });
};

export const Session = ({
  id,
  title,
  location,
  time,
  presenter,
  getSessions,
  isEditing,
  onEditClicked
}: SessionProps) => {
  const [interest, setInterest] = useState(
    sessionsLocalStorage.checkInterest(id)
  );

  const toggleInterest = () => {
    setInterest(!interest);
    sessionsLocalStorage.setInterest(id, !interest);
  };

  return (
    <Card className="session" fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          <Icon name="user" />
          {presenter}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {location} @ {time}
      </Card.Content>
      <Card.Content>
        <Button icon>
          <Icon
            name={interest ? "heart" : "heart outline"}
            onClick={() => toggleInterest()}
          />
        </Button>
        <Button
          className="delete-session"
          icon
          onClick={() => deleteSessionById(id, getSessions)}
        >
          <Icon name="trash" />
        </Button>
        {!isEditing && (
          <Button className="edit-session" onClick={() => onEditClicked(id)}>
            Edit
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};
