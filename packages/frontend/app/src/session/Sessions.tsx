import React, { FC, useState } from "react";
import { Session } from "./Session";
import { ISession } from "./SessionContainer";
import { Button } from "semantic-ui-react";
import * as sessionStorage from "../common/sessionsLocalStorage";

interface SessionsProps {
  sessions: ISession[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setSessionToEdit: (session: ISession) => void;
  getSessions: Function;
}

const Sessions: FC<SessionsProps> = props => {
  const [filterByInterest, toggleFilterByInterest] = useState(false);

  const editClicked = (id: number) => {
    const session: ISession = props.sessions.find(s => s.id === id)!;
    props.setSessionToEdit(session);
    props.setIsEditing(true);
  };

  const bySessionTime = function(a: ISession, b: ISession) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  };

  const byInterest = function(session: ISession) {
    return !filterByInterest || sessionStorage.checkInterest(session.id);
  };

  return (
    <React.Fragment>
      <Button onClick={() => toggleFilterByInterest(!filterByInterest)}>
        Filter by Interest
      </Button>
      {props.sessions &&
        props.sessions
          .filter(byInterest)
          .sort(bySessionTime)
          .map((session: ISession) => (
            <React.Fragment key={session.id}>
              <Session
                {...session}
                getSessions={props.getSessions}
                onEditClicked={editClicked}
                isEditing={props.isEditing}
              />
            </React.Fragment>
          ))}
    </React.Fragment>
  );
};

export default Sessions;
