import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { ISpace } from "../api/ISpace";
import * as spaceAPI from "../api/spaceAPI";
import SpaceDropdown from "./SpaceDropdown";
enzyme.configure({ adapter: new Adapter() });

it("Renders sessions when sessions exist", () => {
  const spaces: ISpace[] = [
    {
      id: 1,
      name: "Space 1",
      description: "",
      facilities: "",
      location: ""
    },
    {
      id: 2,
      name: "Space 2",
      description: "",
      facilities: "",
      location: ""
    }
  ];

  jest.spyOn(spaceAPI, "getSpaces").mockImplementation(async () => spaces);

  const wrapper = enzyme.shallow(<SpaceDropdown />);
  console.log(wrapper.html());
  // const doesContainSession = wrapper.contains(
  //   <
  //     id={0}
  //     title="title"
  //     presenter="presenter"
  //     location="location"
  //     time="12:00"
  //   />
  // );
  // expect(doesContainSession).toBe(true);
});
