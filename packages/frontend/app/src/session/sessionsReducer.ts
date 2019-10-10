import { ISessionsContext, ISession } from "./sessionsContext";

export const ADD_SESSION: string = "addSession";

type Action =
  | { type: string; payload: ISession }
  | { type: "addSession"; payload: ISession[] }
  | { type: string };

const reducer = (state: ISessionsContext, action: Action): ISessionsContext => {
  switch (action.type) {
    case ADD_SESSION:
      return {
        ...state,
        sessions: action.payload
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
