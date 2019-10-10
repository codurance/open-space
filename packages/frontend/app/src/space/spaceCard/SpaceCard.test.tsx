import React from "react";
import SpaceCard from "./SpaceCard";
import { ISpace } from "../SpaceContainer";
import enzyme, { ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });

let spaceDataToTest: ISpace = {
  id: 1,
  name: "room1",
  location: "the moon",
  description: "a room called room1",
  facilities: "a bar"
};

let wrapper: ShallowWrapper;
beforeEach(() => {
  wrapper = enzyme.shallow(<SpaceCard {...spaceDataToTest} />);
});

it("Displays space", () => {
  const spaceElement = wrapper.find({ className: "space" });

  expect(spaceElement.find({ className: "space-name" }).html()).toContain(
    "room1"
  );
  expect(spaceElement.find({ className: "space-location" }).html()).toContain(
    "the moon"
  );
  expect(
    spaceElement.find({ className: "space-description" }).html()
  ).toContain("a room called room1");
  expect(spaceElement.find({ className: "space-facilities" }).html()).toContain(
    "a bar"
  );
});
