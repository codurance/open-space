import React, { useContext } from "react";

export interface ISession {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
}

export interface ISessionsState {
  sessions: ISession[];
  currentSession: ISession | undefined;
  sessionTypesToFilter?: string[];
}
export interface ISessionsContext {
  state: ISessionsState;
  dispatch: Function;
}

const SessionsContext = React.createContext<ISessionsContext>({
  state: {
    sessions: [],
    currentSession:undefined
  },
  dispatch: () => {}
} as ISessionsContext);

export const useSessionsContext = () => useContext(SessionsContext);
export default SessionsContext;
