import { post, get } from "../../common/http";
import { ISpace } from "./ISpace";

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
  const getSpacesResponse = await get<ISpace[]>(`/api/spaces`);
  const spaces = getSpacesResponse.parsedBody;
  return spaces!;
};
