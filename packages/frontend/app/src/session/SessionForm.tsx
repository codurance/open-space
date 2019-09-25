import React, { useState, FC } from "react";
import { post } from "../common/http";

<<<<<<< HEAD
interface ISession {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
}

type Session = {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
};

const SessionForm: FC = () => {
=======
type SessionFormProps = {
  getSessions: any
}

const SessionForm: FC<SessionFormProps> = ({ getSessions }) => {
>>>>>>> 5eb77d8f... Create container to manage getting sessions.
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionLocation, setSessionLocation] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionPresenter, setSessionPresenter] = useState("");
  const [sessions, setSessions] = useState();

  const postSession = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await post(`http://localhost:8080/api/sessions`, {
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
      getSessions()
      setSessionLocation("");
      setSessionTitle("");
      setSessionTime("");
      setSessionPresenter("");
    } else {
      //setError;
    }
  };

  return (
    <form onSubmit={event => postSession(event)}>
      <label>
        Title:
        <input
          type="text"
          value={sessionTitle}
          onChange={e => setSessionTitle(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={sessionLocation}
          onChange={e => setSessionLocation(e.target.value)}
        />
      </label>
      <label>
        Presenter:
        <input
          type="text"
          value={sessionPresenter}
          onChange={e => setSessionPresenter(e.target.value)}
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          value={sessionTime}
          onChange={e => setSessionTime(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SessionForm;
