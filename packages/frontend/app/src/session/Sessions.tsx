import React, { FC } from "react";
import { Session, SessionProps } from "./Session";
import { ISession } from './SessionContainer'

type SessionsProps = {
  sessions: ISession[]
}

const Sessions: FC<SessionsProps> = ({ sessions }) => {


  return (
    <React.Fragment>
      <div>
        {sessions &&
          sessions.map((session: SessionProps) => {
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
