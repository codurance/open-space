import React, { FC } from "react";
import { Session, SessionProps } from "./Session";
import { ISession } from './SessionContainer'

type SessionsProps = {
  sessions: ISession[]
}

const Sessions: FC<SessionsProps> = ({ sessions }) => {

  const compare = (a: ISession, b: ISession) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);
  
  return (
    <React.Fragment>
      <div>
        {sessions &&
          sessions.sort(compare).map((session: SessionProps) => {
            const { id, presenter, title, location, time } = session;
            return (
              <Session
                id={id}
                presenter={presenter}
                title={title}
                location={location}
                time={time}
                key={id}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Sessions;
