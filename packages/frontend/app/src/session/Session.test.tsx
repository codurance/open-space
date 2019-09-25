import React from "react";
import { Session } from "./Session";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
enzyme.configure({ adapter: new Adapter() });

const id = 0
const title = "title"
const location = "location"
const presenter = "presenter"
const time = "12:00"

it('Displays session', () => {
  const wrapper = enzyme.shallow(<Session
    id={id}
    title={title}
    presenter={presenter}
    location={location}
    time={time}/>);
  const sessionElement = wrapper.find(".session");
  expect(sessionElement.text()).toBe(`${title}, ${location}, ${time}, ${presenter}`);
});
