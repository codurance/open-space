import React, { useState } from "react";
import { deleteSession } from "../common/http";
import { Button, Card, Icon } from "semantic-ui-react";
import * as sessionStorage from "../common/sessionsLocalStorage";

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
  const [interest, setInterest] = useState(sessionStorage.checkInterest(id));

  const toggleInterest = () => {
    setInterest(!interest);
    sessionStorage.saveItemValue(id, !interest);
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
        <Button icon>
          <Icon
            name="trash"
            onClick={() => deleteSessionById(id, getSessions)}
          />
        </Button>
      </Card.Content>
    </Card>
  );
};
