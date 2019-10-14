import React from "react";
import Sessions from "./Sessions";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { any } from "prop-types";
import * as SessionsContext from "./sessionsContext";
import { Session } from "./sessionCard/Session";
enzyme.configure({ adapter: new Adapter() });

it("Renders sessions when sessions exist", () => {
  const wrapper = enzyme.shallow(<Sessions isFilteringByInterest={false} />);

  const sessionElementChildren = wrapper.find(any);

  expect(sessionElementChildren.length).toBe(0);
});

it("Renders sessions when sessions exist", () => {
  const sessions: SessionsContext.ISession[] = [
    {
      id: 0,
      title: "title",
      location: {
        name: "location",
        description: "",
        facilities: "",
        location: ""
      },
      time: "12:00",
      presenter: "presenter",
      type: "Demo"
    }
  ];

  jest.spyOn(SessionsContext, "useSessionsContext").mockImplementation(() => ({
    sessions: sessions,
    setSessions: jest.fn(),
    currentSession: undefined,
    setCurrentSession: jest.fn()
  }));

  const wrapper = enzyme.shallow(<Sessions isFilteringByInterest={false} />);
  console.log(wrapper.debug());

  const doesContainSession = wrapper.contains(
    <Session
      id={0}
      title="title"
      presenter="presenter"
      location="location"
      time="12:00"
      type="Demo"
    />
  );
  console.log(doesContainSession);
  expect(doesContainSession).toBe(true);
});

it("Renders sessions after filtering by sessiontype", () => {
  const sessions: SessionsContext.ISession[] = [
    {
      id: 0,
      title: "title",
      location: {
        name: "Keep Me Please",
        description: "",
        facilities: "",
        location: ""
      },
      time: "12:00",
      presenter: "presenter",
      type: "Demo"
    },
    {
      id: 1,
      title: "title",
      location: {
        name: "I should not be here",
        description: "",
        facilities: "",
        location: ""
      },
      time: "12:00",
      presenter: "presenter",
      type: "demo"
    }
  ];

  jest.spyOn(SessionsContext, "useSessionsContext").mockImplementation(() => ({
    sessions: sessions,
    setSessions: jest.fn(),
    currentSession: undefined,
    setCurrentSession: jest.fn(),
    sessionTypesToFilter: ["Keep Me Please"]
  }));

  const wrapper = enzyme.shallow(<Sessions isFilteringByInterest={false} />);
  expect(wrapper.find(Session).length).toEqual(1);
});
