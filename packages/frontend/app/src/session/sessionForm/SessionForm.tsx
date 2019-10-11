import React, { useState } from "react";
import { Button, Dropdown, Form, Label, Modal } from "semantic-ui-react";
import SpaceDropdown from "../../space/spaceDropdown/SpaceDropdown";
import * as sessionAPI from "../api/sessionAPI";
import { useSessionsContext } from "../sessionsContext";
import { editSession } from "../api/sessionAPI";

const SessionForm: React.FC = () => {
  const {
    setSessions,
    setCurrentSession,
    currentSession,
    setSessionTypesToFilter
  } = useSessionsContext();
  const editingSession = currentSession!;

  const [spaceErrorMessageFlag, setSpaceErrorMessageFlag] = useState(false);
  const [titleErrorMessageFlag, setTitleErrorMessageFlag] = useState(false);
  const [presenterErrorMessageFlag, setPresenterErrorMessageFlag] = useState(
    false
  );

  const [sessionTitle, setSessionTitle] = useState(editingSession.title);
  const [sessionSpaceId, setSessionSpaceId] = useState(
    editingSession.location.id!
  );
  const [sessionTime, setSessionTime] = useState(editingSession.time);
  const [sessionPresenter, setSessionPresenter] = useState(
    editingSession.presenter
  );

  const [sessionType, setSessionType] = useState();

  const fieldsAreValid = () => {
    let valid = true;

    if (!sessionTitle) {
      setTitleErrorMessageFlag(true);
      valid = false;
    }

    if (!sessionSpaceId) {
      setSpaceErrorMessageFlag(true);
      valid = false;
    }

    if (!sessionPresenter) {
      setPresenterErrorMessageFlag(true);
      valid = false;
    }

    return valid;
  };

  const options = [
    { key: "1", text: "Demo", value: "Demo" },
    { key: "2", text: "Practical", value: "Practical" },
    { key: "3", text: "Workshop", value: "Workshop" },
    { key: "4", text: "Round Table", value: "Round Table" }
  ];

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const sessionToSubmit: sessionAPI.SessionRequestBody = {
      presenter: sessionPresenter,
      spaceId: sessionSpaceId,
      time: sessionTime,
      title: sessionTitle,
      type: sessionType
    };

    if (!fieldsAreValid()) {
      return;
    }

    let response: any;

    if (editingSession.id) {
      response = await sessionAPI.editSession(
        editingSession.id,
        sessionToSubmit!
      );
    } else {
      response = await sessionAPI.postSession(sessionToSubmit);
    }

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

  return (
    <Modal open={currentSession !== undefined}>
      <Modal.Header>
        {!editingSession.id ? "Submit" : "Edit"} A Session
      </Modal.Header>
      <Modal.Content>
        <Form inverted onSubmit={event => submitForm(event)}>
          <Form.Field inline>
            <label>Title</label>
            <input
              placeholder="title"
              value={sessionTitle}
              onChange={e => setSessionTitle(e.target.value)}
            />
            {titleErrorMessageFlag && (
              <Label basic color="red" pointing="left">
                Please enter title for this session!
              </Label>
            )}
          </Form.Field>
          <Form.Field inline>
            <SpaceDropdown
              value={sessionSpaceId}
              onChange={(_event, data) =>
                setSessionSpaceId(data.value as number)
              }
            />
            {spaceErrorMessageFlag && (
              <Label basic color="red" pointing="left">
                Please select space name!
              </Label>
            )}
          </Form.Field>

          <Form.Field inline>
            <label>Presenter</label>
            <input
              placeholder="presenter"
              value={sessionPresenter}
              onChange={e => setSessionPresenter(e.target.value)}
            />
            {presenterErrorMessageFlag && (
              <Label basic color="red" pointing="left">
                Please enter presenter's name!
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <label>Session Type</label>
            <Dropdown
              className="dropdown"
              placeholder="Session Type"
              selection
              options={options}
              onChange={(_event, data) => {
                setSessionType(data.value);
              }}
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
          <Button type="submit">{!editingSession.id ? "Add" : "Edit"}</Button>
          <Button onClick={event => onExitForm(event)}>Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SessionForm;
