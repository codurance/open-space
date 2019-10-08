import React from "react";
import { Session } from "./Session";
import SessionsContext, {
  ISession,
  useSessionsContext
} from "./sessionsContext";
import * as sessionStorage from "../common/sessionsLocalStorage";

interface SessionsProps {
  isFilteringByInterest: boolean;
}

const Sessions: React.FC<SessionsProps> = props => {
  // const { sessions } = useContext(SessionsContext);
  const { sessions } = useSessionsContext();

  const bySessionTime = function(a: ISession, b: ISession) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  };

  const byInterest = function(session: ISession) {
    return (
      !props.isFilteringByInterest || sessionStorage.checkInterest(session.id)
    );
  };

  return (
    <React.Fragment>
      {sessions &&
        sessions
          .filter(byInterest)
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
