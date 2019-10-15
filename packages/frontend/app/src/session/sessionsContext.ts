import React, { useContext } from "react";

export interface ISession {
  id: number;
  title: string;
  time: string;
  presenter: string;
}

export interface ISessionsState {
  sessions: ISession[];
  currentSession: ISession | undefined;
  sessionTypesToFilter: string[];
  isFormVisible: boolean;
}
export interface ISessionsContext {
  state: ISessionsState;
  dispatch: Function;
}

const SessionsContext = React.createContext<ISessionsContext>({
  state: {
    sessions: [],
    currentSession: undefined,
    sessionTypesToFilter: [],
    isFormVisible: false
  },
  dispatch: () => {}
} as ISessionsContext);

export const useSessionsContext = () => useContext(SessionsContext);
export default SessionsContext;
