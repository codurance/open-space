import { ISession } from "../SessionContainer";
import {
  put,
  post,
  get,
  IHttpResponse,
  deleteRequest
} from "../../common/http";
import "whatwg-fetch";

export const editSession = async (session: ISession) => {
  let response: IHttpResponse<any> = await put(`/api/sessions/${session.id}`, {
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
  const response: IHttpResponse<any> = await post(`/api/sessions`, {
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

export const deleteSession = async (id: number) => {
  const response = await deleteRequest(`/api/sessions/` + id);
  return response;
};
