import React, { useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import * as sessionsLocalStorage from "../common/sessionsLocalStorage";
import * as sessionAPI from "./api/sessionAPI";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
  getSessions?: Function;
  onEditClicked: Function;
  isEditing: boolean;
  forceUpdate: Function;
};

const deleteSessionById = async (
  id: number,
  getSessions: Function | undefined
) => {
  const response = await sessionAPI.deleteSession(id);
  if (response.ok && getSessions) {
    getSessions();
  }
};

export const Session = ({
  id,
  title,
  location,
  time,
  presenter,
  getSessions,
  isEditing,
  onEditClicked,
  forceUpdate
}: SessionProps) => {
  const [interest, setInterest] = useState(
    sessionsLocalStorage.checkInterest(id)
  );

  const toggleInterest = () => {
    setInterest(!interest);
    sessionsLocalStorage.setInterest(id, !interest);
    forceUpdate();
    //console.log("force update");
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
