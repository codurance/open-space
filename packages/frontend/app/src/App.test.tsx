import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });

/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/

it('Displays "OpenSpace"', () => {
  const wrapper = enzyme.shallow(<App />);
  const helloWorldElement = wrapper.find(".OpenSpace");
  expect(helloWorldElement.text()).toBe("OpenSpace");
});
