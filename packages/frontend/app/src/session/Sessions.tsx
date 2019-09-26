import React, { FC } from "react";
import { Session } from "./Session";
import { ISession } from './SessionContainer'

interface SessionsProps {
  sessions: ISession[],
  isEditing: boolean,
  setIsEditing: (isEditing: boolean) => void,
  setSessionToEdit: (session: ISession) => void
}

const Sessions: FC<SessionsProps> = (args) => {

  const editClicked = (session: ISession) => {
    args.setSessionToEdit(session);
    args.setIsEditing(true);
  };

  return (
    <React.Fragment>
      {
        args.sessions && args.sessions.map((session: ISession) =>
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
