import React, { useState, useContext, useEffect, SyntheticEvent } from "react";
import { Modal, Button, Form, Dropdown } from "semantic-ui-react";
import * as sessionAPI from "../api/sessionAPI";
import { useSessionsContext } from "../sessionsContext";
import SessionsContext from "../sessionsContext";

const SessionForm: React.FC = () => {
  const { setSessions, setCurrentSession, currentSession } = useContext(
    SessionsContext
  );

  const [sessionType, setSessionType] = useState(currentSession!.type);
  const [sessionTitle, setSessionTitle] = useState(currentSession!.title);
  const [sessionLocation, setSessionLocation] = useState(
    currentSession!.location
  );
  const [sessionTime, setSessionTime] = useState(currentSession!.time);
  const [sessionPresenter, setSessionPresenter] = useState(
    currentSession!.presenter
  );

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    currentSession!.title = sessionTitle;
    currentSession!.location = sessionLocation;
    currentSession!.time = sessionTime;
    currentSession!.presenter = sessionPresenter;
    currentSession!.type = sessionType;

    let response: any;

    if (!currentSession!.id)
      response = await sessionAPI.postSession(currentSession!);
    else response = await sessionAPI.editSession(currentSession!);

    if (response.ok) {
      const updatedSessions = await sessionAPI.getSessions();
      if (updatedSessions) setSessions(updatedSessions);
      setCurrentSession(undefined);
    }
  };

  const onExitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentSession(undefined);
  };

  const options = [
    { key: "1", text: "demo", value: "demo" },
    { key: "2", text: "practical", value: "practical" },
    { key: "3", text: "presentation", value: "presentation" }
  ];

  return (
    <Modal open={currentSession !== undefined}>
      <Modal.Header>
        {!currentSession!.id ? "Submit" : "Edit"} A Session
      </Modal.Header>
      <Modal.Content>
        <Form inverted onSubmit={event => submitForm(event)}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="title"
              value={sessionTitle}
              onChange={e => setSessionTitle(e.target.value)}
            />
          </Form.Field>
          {/* <Form.Field>
            <label>Location</label>
            <input
              placeholder="location"
              value={sessionLocation}
              onChange={e => setSessionLocation(e.target.value)}
            />
          </Form.Field> */}
          <Form.Field>
            <label>Presenter</label>
            <input
              placeholder="presenter"
              value={sessionPresenter}
              onChange={e => setSessionPresenter(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Session Type</label>
            <Dropdown
              className="form-dropdown"
              placeholder="Select session type"
              selection
              options={options}
              onChange={(_event, data) => console.log(data)}
            />
          </Form.Field>
          <Form.Field>
            <label>Time</label>
            <input
              type="time"
              placeholder="time"
              value={sessionTime}
              onChange={e => setSessionTime(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">{!currentSession!.id ? "Add" : "Edit"}</Button>
          <Button onClick={event => onExitForm(event)}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SessionForm;
