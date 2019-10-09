import { post, get, IHttpResponse } from "../../common/http";
import { ISpace } from "../SpaceContainer";

export const postSpace = async (space: ISpace) => {
  const response: Response = await post(`/api/spaces`, {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(space)
  });

  return response;
};

export const getSpaces = async () => {
  const getSpacesResponse = await get<IHttpResponse<ISpace[]>>(`/api/spaces`);
  const spaces = getSpacesResponse.parsedBody;
  return spaces;
};
