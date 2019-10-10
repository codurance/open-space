import React from "react";
import * as sessionStorage from "../common/sessionsLocalStorage";
import { Session, SessionProps } from "./Session";
import { ISession, useSessionsContext } from "./sessionsContext";

interface SessionsProps {
  isFilteringByInterest: boolean;
}

const Sessions: React.FC<SessionsProps> = props => {
  const { sessions, sessionTypesToFilter } = useSessionsContext();

  const bySessionTime = function(a: ISession, b: ISession) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  };

  const byInterest = (session: ISession) => {
    return (
      !props.isFilteringByInterest || sessionStorage.checkInterest(session.id)
    );
  };

  const byType = (session: ISession) => {
    if (
      sessionTypesToFilter === undefined ||
      sessionTypesToFilter.length === 0
    ) {
      return true;
    }
    if (sessionTypesToFilter!.indexOf(session.location.name) >= 0) {
      return true;
    }
    return false;
  };

  const copySessionToProps = (session: ISession): SessionProps => {
    const copyOfSession: any = { ...session };
    copyOfSession.location = session.location.name;
    return copyOfSession;
  };

  return (
    <React.Fragment>
      {sessions &&
        sessions
          .filter(byInterest)
          .filter(byType)
          .sort(bySessionTime)
          .map((session: ISession) => (
            <React.Fragment key={session.id}>
              <Session {...copySessionToProps(session)} />
            </React.Fragment>
          ))}
    </React.Fragment>
  );
};

export default Sessions;
