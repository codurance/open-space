import React from "react";

export interface ISession {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
}

export interface ISessionsContext {
  sessions: ISession[];
  setSessions: Function;
  currentSession: ISession | undefined;
  setCurrentSession: Function;
}

const SessionsContext = React.createContext<ISessionsContext>({
  sessions: [],
  setSessions: () => {},
  currentSession: undefined,
  setCurrentSession: () => {}
});

export default SessionsContext;
