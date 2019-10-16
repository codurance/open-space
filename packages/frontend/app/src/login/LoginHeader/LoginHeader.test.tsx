import React from "react";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginHeader from "./LoginHeader";
enzyme.configure({ adapter: new Adapter() });

it("Renders header of login page", () => {
  const wrapper = enzyme.shallow(<LoginHeader />);
  const titleContent = wrapper.find(".title").text();

  expect(titleContent).toBe("Welcome to Open Space Application");
});
