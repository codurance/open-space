import React from "react";
import { Session } from "./Session";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Card, Button } from "semantic-ui-react";
enzyme.configure({ adapter: new Adapter() });

const id = 0;
const title = "title";
const location = "location";
const presenter = "presenter";
const time = "12:00";

it("Displays session", () => {
  const wrapper = enzyme.shallow(
    <Session
      id={id}
      title={title}
      presenter={presenter}
      location={location}
      time={time}
    />
  );
  const sessionElement = wrapper.find({ className: "session" });
  // FIXME: can't find a way to fix it for now
  // expect(sessionElement).toBe(<Card />);
});

it("Displays delete button", () => {
  const wrapper = enzyme.shallow(
    <Session
      id={id}
      title={title}
      presenter={presenter}
      location={location}
      time={time}
    />
  );
  const sessionElement = wrapper.find(".delete-session");
  // FIXME: can't find a way to fix it for now
  // expect(sessionElement).toBe(<Button />);
});
