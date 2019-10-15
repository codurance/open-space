import React from "react";
import * as sessionStorage from "../common/sessionsLocalStorage";
import { Session } from "./sessionCard/Session";
import { ISession, useSessionsContext } from "./sessionsContext";
import "./Sessions.css";

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
    return sessionTypesToFilter!.indexOf(session.type) >= 0;
  };

  return (
    <div className="sessionsContainer">
      <React.Fragment>
        {sessions &&
          sessions
            .filter(byInterest)
            .filter(byType)
            .sort(bySessionTime)
            .map((session: ISession) => (
              <React.Fragment key={session.id}>
                <Session {...{ ...session, location: session.location.name }} />
              </React.Fragment>
            ))}
      </React.Fragment>
    </div>
  );
};

export default Sessions;
