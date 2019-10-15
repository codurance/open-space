import React from "react";
import * as sessionStorage from "../common/sessionsLocalStorage";
import { Session } from "./Session";
import { ISession, useSessionsContext } from "./sessionsContext";

interface SessionsProps {
  isFilteringByInterest: boolean;
}

const Sessions: React.FC<SessionsProps> = props => {
  const { state } = useSessionsContext();

  const bySessionTime = function(a: ISession, b: ISession) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  };

  const byInterest = (session: ISession) => {
    return (
      !props.isFilteringByInterest || sessionStorage.checkInterest(session.id!)
    );
  };

  const byType = (session: ISession) => {
    return true;
  };

  return (
    <React.Fragment>
      {state.sessions &&
        state.sessions
          .filter(byInterest)
          .filter(byType)
          .sort(bySessionTime)
          .map((session: ISession) => (
            <React.Fragment key={session.id}>
              <Session {...session} />
            </React.Fragment>
          ))}
    </React.Fragment>
  );
};

export default Sessions;
