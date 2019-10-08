import React from "react";
import Sessions from "./Sessions";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { any } from "prop-types";
import * as SessionsContext from "./sessionsContext";
import { Session } from "./Session";
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
      location: "location",
      time: "12:00",

      presenter: "presenter"
    }
  ];

  jest.spyOn(SessionsContext, "useSessionsContext").mockImplementation(() => ({
    sessions: sessions,
    setSessions: jest.fn(),
    currentSession: undefined,
    setCurrentSession: jest.fn()
  }));

  const wrapper = enzyme.shallow(<Sessions isFilteringByInterest={false} />);

  const doesContainSession = wrapper.contains(
    <Session
      id={0}
      title="title"
      presenter="presenter"
      location="location"
      time="12:00"
    />
  );
  expect(doesContainSession).toBe(true);
});
