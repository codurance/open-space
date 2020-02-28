import enzyme from "enzyme";
import Header from "./header";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });

it('Displays "OpenSpace"', () => {
  const wrapper = enzyme.shallow(<Header />);
  const header = wrapper.find(".OpenSpace");
  expect(header.text()).toBe("OpenSpace");
});
