import React from "react";
import { Session } from "./Session";
import enzyme, { ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button } from "semantic-ui-react";
enzyme.configure({ adapter: new Adapter() });

const id = 0;
const title = "title";
const location = "location";
const presenter = "presenter";
const time = "12:00";

let wrapper: ShallowWrapper;
beforeEach(() => {
  wrapper = enzyme.shallow(
    <Session
      id={id}
      title={title}
      presenter={presenter}
      location={location}
      time={time}
      onEditClicked={jest.fn()}
      isEditing={false}
    />
  );
});

it("Displays session", () => {
  const sessionElement = wrapper.find({ className: "session" });

  expect(sessionElement.find({ className: "session-title" }).html()).toContain(
    title
  );

  expect(
    sessionElement.find({ className: "session-presenter" }).html()
  ).toContain(presenter);

  expect(
    sessionElement.find({ className: "session-extra-details" }).html()
  ).toContain(location);

  expect(
    sessionElement.find({ className: "session-extra-details" }).html()
  ).toContain(time);
});

it("Displays delete button", () => {
  const sessionElement = wrapper.find(".delete-session");

  expect(sessionElement.type()).toBe(Button);
});

it("Displays edit button", () => {
  const sessionElement = wrapper.find(".edit-session");

  expect(sessionElement.type()).toBe(Button);
});
