import React from "react";
import enzyme, { ShallowWrapper } from "enzyme";
import SpaceContainer, { ISpace } from "./SpaceContainer";
import SpaceCard from "./spaceCard/SpaceCard";
import Adapter from "enzyme-adapter-react-16";

enzyme.configure({ adapter: new Adapter() });

const spaces: ISpace[] = [
  {
    id: 1,
    name: "room1",
    location: "the moon",
    description: "a room called room1",
    facilities: "a bar"
  }
];

it("should render spaces", () => {
  let wrapper: ShallowWrapper;
  wrapper = enzyme.shallow(<SpaceContainer spaces={spaces} />);
  const spaceElement = wrapper.find(SpaceCard).dive();

  console.log(spaceElement.html());

  expect(spaceElement.find({ className: "space-name" }).html()).toContain(
    "room1"
  );
});
