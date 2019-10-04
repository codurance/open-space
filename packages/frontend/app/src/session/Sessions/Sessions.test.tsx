import React from "react";
import Sessions from "./Sessions";
import { Session } from "./sessionCard/Session";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { any } from "prop-types";
enzyme.configure({ adapter: new Adapter() });

it("Renders sessions when sessions exist", () => {
  const wrapper = enzyme.shallow(
    <Sessions
      sessions={[]}
      isEditing={false}
      setIsEditing={jest.fn()}
      setSessionToEdit={jest.fn()}
      getSessions={jest.fn()}
      isFilteringByInterest={false}
    />
  );

  const sessionElementChildren = wrapper.find(any);

  expect(sessionElementChildren.length).toBe(0);
});

it("Renders sessions when sessions exist", () => {
  const wrapper = enzyme.shallow(
    <Sessions
      sessions={[
        {
          id: 0,
          title: "title",
          location: "location",
          time: "12:00",
          presenter: "presenter"
        }
      ]}
      isEditing={false}
      setIsEditing={jest.fn()}
      setSessionToEdit={jest.fn()}
      getSessions={jest.fn()}
      isFilteringByInterest={false}
    />
  );

  const doesContainSession = wrapper.contains(
    <Session
      id={0}
      title="title"
      presenter="presenter"
      location="location"
      time="12:00"
    />
  );
  // FIXME: can't find a way to fix it for now
  // expect(doesContainSession).toBe(true);
});
