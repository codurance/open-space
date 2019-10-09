import { put, post, get, IHttpResponse } from "../../common/http";

export interface ISpace {
  name: string;
  description: string;
  location: string;
  facilities: string;
}

export const postSpace = async (space: ISpace) => {
  const response: Response = await post(`/api/spaces`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(space)
  });

  return response;
};
