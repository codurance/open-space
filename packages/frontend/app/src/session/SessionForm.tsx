import React, { useState, FC } from "react";
import { post } from "../common/http";
import { Button, Form, Header } from "semantic-ui-react";

type SessionFormProps = {
  getSessions: any;
};

const SessionForm: FC<SessionFormProps> = ({ getSessions }) => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionLocation, setSessionLocation] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionPresenter, setSessionPresenter] = useState("");

  const postSession = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await post(`/api/sessions`, {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: sessionTitle,
        location: sessionLocation,
        time: sessionTime,
        presenter: sessionPresenter
      })
    });

    if (response.ok) {
      getSessions();
      setSessionLocation("");
      setSessionTitle("");
      setSessionTime("");
      setSessionPresenter("");
    } else {
      //setError;
    }
  };

  return (
    <>
      <Header>Submit A Session</Header>
      <Form onSubmit={event => postSession(event)}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="title"
            value={sessionTitle}
            onChange={e => setSessionTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <input
            placeholder="location"
            value={sessionLocation}
            onChange={e => setSessionLocation(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Presenter</label>
          <input
            placeholder="presenter"
            value={sessionPresenter}
            onChange={e => setSessionPresenter(e.target.value)}
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
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default SessionForm;
