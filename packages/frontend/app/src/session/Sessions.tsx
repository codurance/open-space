import React, { FC, useState } from "react";
import { Session } from "./Session";
import { ISession } from "./SessionContainer";
import { Button } from "semantic-ui-react";
import * as sessionStorage from "../common/sessionsLocalStorage";

import "./sessions.css";

interface SessionsProps {
  sessions: ISession[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setSessionToEdit: (session: ISession) => void;
  getSessions: Function;
}

const Sessions: FC<SessionsProps> = args => {
  const [filterByInterest, setFilterByInterest] = useState(false);

  const editClicked = (id: number) => {
    const session: ISession = args.sessions.find(s => s.id === id) as ISession;
    args.setSessionToEdit(session);
    args.setIsEditing(true);
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
      <Button onClick={() => setFilterByInterest(!filterByInterest)}>
        Filter by Interest
      </Button>
      {args.sessions &&
        args.sessions
          .filter(byInterest)
          .sort(bySessionTime)
          .map((session: ISession) => (
            <React.Fragment key={session.id}>
              <Session
                {...session}
                getSessions={args.getSessions}
                onEditClicked={editClicked}
                isEditing={args.isEditing}
              />
            </React.Fragment>
          ))}
    </React.Fragment>
  );
};

export default Sessions;
