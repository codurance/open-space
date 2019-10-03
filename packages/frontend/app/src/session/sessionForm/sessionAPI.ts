import { ISession } from "../SessionContainer";
import { put, post } from "../../common/http";

export const editSession = async (session: ISession) => {
  console.log("edit session");
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
  console.log("post session");
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
