import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
enzyme.configure({ adapter: new Adapter() });

it("Render and Redirect to login if no user data", async () => {
  const div = document.createElement("div");
  const redirect = jest.fn();
  jest.spyOn(document.location, "assign").mockImplementation(redirect);

  await act(async () => ReactDOM.render(<App />, div));

  expect(redirect.mock.calls[0][0]).toBe("/login");
  ReactDOM.unmountComponentAtNode(div);
});

it('Displays "OpenSpace"', () => {
  const wrapper = enzyme.shallow(<App />);
  const helloWorldElement = wrapper.find(".OpenSpace");
  expect(helloWorldElement.text()).toBe("OpenSpace");
});
