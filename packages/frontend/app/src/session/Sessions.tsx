import React, { FC } from "react";
import { Session } from "./Session";
import { ISession } from './SessionContainer'

interface SessionsProps {
  sessions: ISession[],
  isEditing: boolean,
  setIsEditing: (isEditing: boolean) => void,
  setSessionToEdit: (session: ISession) => void,
  getSessions: Function
}

const Sessions: FC<SessionsProps> = (args) => {

  const editClicked = (session: ISession) => {
    args.setSessionToEdit(session);
    args.setIsEditing(true);
  };

  const bySessionTime = function (a: ISession, b: ISession) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  };

  return (
    <React.Fragment>
      {
        args.sessions && args.sessions.sort(bySessionTime).map((session: ISession) =>
          <React.Fragment key={session.id}>
            <Session {...session} />
            {!args.isEditing && <button onClick={() => editClicked(session)}> Edit </button>}
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
};

export default Sessions;
