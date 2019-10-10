import React, { useContext } from "react";
import { ISpace } from "../space/ISpace";

export interface ISession {
  id: number;
  title: string;
  location: ISpace;
  time: string;
  presenter: string;
  type: string;
}

export interface ISessionsContext {
  sessions: ISession[];
  setSessions: Function;
  currentSession: ISession | undefined;
  setCurrentSession: Function;
  sessionTypesToFilter?: string[];
  setSessionTypesToFilter?: Function;
}

const SessionsContext = React.createContext<ISessionsContext>({
  sessions: [],
  setSessions: () => {},
  currentSession: undefined,
  setCurrentSession: () => {}
});

export const useSessionsContext = () => useContext(SessionsContext);
export default SessionsContext;
