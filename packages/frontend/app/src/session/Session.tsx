import React, { useState } from "react";
import { deleteSession } from "../common/http";
import { Button, Card, Icon } from "semantic-ui-react";
import * as sessionStorage from "../common/sessionsLocalStorage"

import "./session.css";

export type SessionProps = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
  getSessions?: Function;
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
  getSessions
}: SessionProps) => {

  let interestFromLocalStorage: boolean  = sessionStorage.getItemValue(id);
  const [interest, setInterest] = useState(interestFromLocalStorage);
  
  const onInterest = () => {
    const newValue:boolean = !interest;
    setInterest(newValue);
    sessionStorage.saveItemValue(String(id), newValue);
  };

  return (
    <Card className="session" fluid>
      <Card.Content>
        <Card.Header>
          {title}
          <Button icon className="delete-session">
            <Icon name="x" size="large" onClick={() => deleteSessionById(id, getSessions)} />
          </Button>
        </Card.Header>
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
          {interest? (
            <Icon name="heart outline" onClick={() => onInterest()}/>
          ) : (
            <Icon name="heart" onClick={() => onInterest()}/>
          )}
        </Button>
      </Card.Content>
    </Card>
  );
};
