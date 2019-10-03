import React from "react";
import { Session } from "./Session";
import { ISession } from "./SessionContainer";
import * as sessionStorage from "../common/sessionsLocalStorage";

interface SessionsProps {
  sessions: ISession[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setSessionToEdit: (session: ISession) => void;
  getSessions: Function;
  isFilteringByInterest: boolean;
}

const Sessions: React.FC<SessionsProps> = props => {
  const editClicked = (id: number) => {
    const session: ISession = props.sessions.find(s => s.id === id)!;
    props.setSessionToEdit(session);
    props.setIsEditing(true);
  };

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
      {props.sessions &&
        props.sessions
          .filter(byInterest)
          .sort(bySessionTime)
          .map((session: ISession) => (
            <React.Fragment key={session.id}>
              <Session
                {...session}
                getSessions={props.getSessions}
                onEditClicked={editClicked}
                isEditing={props.isEditing}
              />
            </React.Fragment>
          ))}
    </React.Fragment>
  );
};

export default Sessions;
