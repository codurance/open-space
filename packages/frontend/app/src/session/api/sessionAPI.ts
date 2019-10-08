import { ISession } from "../sessionsContext";
import { put, post, get, IHttpResponse } from "../../common/http";

export const editSession = async (session: ISession) => {
  const response: Response = await put(`/api/sessions/${session.id}`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: session.title,
      location: session.location,
      time: session.time,
      presenter: session.presenter
    })
  });

  return response;
};

export const postSession = async (session: ISession) => {
  const response: Response = await post(`/api/sessions`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: session.title,
      location: session.location,
      time: session.time,
      presenter: session.presenter
    })
  });

  return response;
};

export const getSessions = async () => {
  const getSessionResponse = await get<IHttpResponse<ISession[]>>(
    `/api/sessions`
  );
  const sessions = getSessionResponse.parsedBody;
  return sessions;
};
