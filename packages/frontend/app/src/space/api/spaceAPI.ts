import { post } from "../../common/http";
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
