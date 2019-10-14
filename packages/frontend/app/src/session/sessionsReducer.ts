import { ISession, ISessionsState, ISessionsContext } from "./sessionsContext";

export const SET_SESSIONS: string = "setSessions";

type Action = { type: "setSessions"; payload: ISession[] }

const reducer = (state: ISessionsState, action: Action): ISessionsState => {
  switch (action.type) {
    case SET_SESSIONS:

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
