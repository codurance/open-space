import { get, post, put } from "../../common/http";
import { ISession } from "../sessionsContext";

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
