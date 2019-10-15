import { ISession, ISessionsState } from "./sessionsContext";

type Action =
  | { type: "setSessions"; payload: ISession[] }
  | { type: "setCurrentSession"; payload: ISession }
  | { type: "hideCurrentSession" }
  | { type: "setFilterTypes"; payload: string[] };

const reducer = (state: ISessionsState, action: Action): ISessionsState => {
  switch (action.type) {
    case "setSessions":
      return {
        ...state,
        sessions: action.payload as ISession[]
      };

    case "setCurrentSession":
      return {
        ...state,
        currentSession: action.payload as ISession,
        isFormVisible: true
      };

    case "hideCurrentSession":
      return {
        ...state,
        currentSession: undefined,
        isFormVisible: false
      };

    case "setFilterTypes":
      return {
        ...state,
        sessionTypesToFilter: action.payload as string[]
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
