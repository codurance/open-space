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

  const byInterest = (session: ISession) => {
    return (
      !props.isFilteringByInterest || sessionStorage.checkInterest(session.id)
    );
  };

  const byType = () => {
    return true;
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
              <Session {...session} />
            </React.Fragment>
          ))}
    </React.Fragment>
  );
};

export default Sessions;
