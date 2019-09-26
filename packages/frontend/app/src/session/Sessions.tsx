import React, { FC } from "react";
import { Session, SessionProps } from "./Session";
import { ISession } from './SessionContainer'

type SessionsProps = {
  sessions: ISession[],
  getSessions: Function
}

const Sessions: FC<SessionsProps> = ({ sessions, getSessions }) => {

  const bySessionTime = function (a: ISession, b: ISession) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  }

  return (
    <React.Fragment>
      <div>
        {sessions &&
          sessions.sort(bySessionTime).map((session: any) => {
            const { id, presenter, title, location, time } = session;
            return (
              <Session
                id={id}
                presenter={presenter}
                title={title}
                location={location}
                time={time}
                key={id}
                getSessions={getSessions}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Sessions;
