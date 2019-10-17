import { get, post, put } from "../../common/http";
import { ISession } from "../sessionsContext";
import * as localStorageHelper from "../../common/localStorageHelper";
import { User } from "../../common/User";

export interface SessionRequestBody {
  title: string;
  spaceId: number;
  time: string;
  presenter: string;
  type: string;
}

export const editSession = async (id: number, session: SessionRequestBody) => {
  const response: Response = await put(`/api/sessions/${id}`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(session)
  });

  return response;
};

export const postSession = async (session: SessionRequestBody) => {
  const response: Response = await post(`/api/sessions`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(session)
  });

  return response;
};

export const getSessions = async () => {
  const getSessionResponse = await get<ISession[]>(`/api/sessions`);
  const sessions = getSessionResponse.parsedBody;
  return sessions;
};

export const updateSessionInterest = (sessionId: number): void => {
  localStorageHelper.retrieveUserInformation().then((userInfo: User) => {
    post(`/api/sessions/${sessionId}/likes/${userInfo.email}`, {});
  });
};
