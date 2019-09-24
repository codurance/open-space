import React, { useEffect, useState, FC } from "react";
import { get, IHttpResponse } from "../common/http";
import { Session, SessionProps } from "./Session";

interface ISession {
  id: number;
  title: string;
  location: string;
  time: string;
  presenter: string;
}

const Sessions: FC = () => {
  const [sessions, setSessions] = useState();

  useEffect(() => {
    async function getSessionResponse() {
      const getSessionResponse = await get<IHttpResponse<ISession[]>>(
        `http://localhost:8080/api/sessions`
      );
      const sessions = getSessionResponse.parsedBody;
      setSessions(sessions);
    }
    getSessionResponse();
  }, []);

  return (
    <React.Fragment>
      <div>
        {sessions &&
          sessions.map((session: SessionProps) => {
            const { id, presenter, title, location, time } = session;
            return (
              <Session
                id={id}
                presenter={presenter}
                title={title}
                location={location}
                time={time}
                key={id}
              />
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Sessions;
