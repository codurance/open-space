import React from "react";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginContent from "./LoginContent";
enzyme.configure({ adapter: new Adapter() });

it("Renders content of login page", () => {
  const wrapper = enzyme.shallow(<LoginContent />);
  const titleContent = wrapper.find("p").text();

  expect(titleContent).toBe("Login with your codurance account here:");
});
