import React from "react";
import Sessions from "./Sessions";
import {Session} from './Session'
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { any } from "prop-types";
enzyme.configure({ adapter: new Adapter() });

it('Renders sessions when sessions exist', () => {
  const wrapper = enzyme.shallow(<Sessions sessions={[]} />);
  const sessionElementChildren = wrapper.find(any)

  expect(sessionElementChildren.length).toBe(0);
});

it('Renders sessions when sessions exist', () => {
  const wrapper = enzyme.shallow(<Sessions sessions={[{
    id: 0,
    title: "title",
    location: "location",
    time: "12:00",
    presenter: "presenter"
  }]} />);

  const doesContainSession = wrapper.contains(<Session id={0}
    title="title"
    presenter="presenter"
    location="location"
    time="12:00"/>)

  expect(doesContainSession).toBe(true);
});
