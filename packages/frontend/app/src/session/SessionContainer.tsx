import React, { useEffect, useState, FC } from 'react';
import { get, IHttpResponse } from "../common/http";

import Sessions from './Sessions';
import SessionForm from './SessionForm';

export interface ISession {
    id: number;
    title: string;
    location: string;
    time: string;
    presenter: string;
}

const SessionContainer: FC = () => {
    const [sessions, setSessions] = useState();

    const getSessionResponse = async () => {
        const getSessionResponse = await get<IHttpResponse<ISession[]>>(
            `/api/sessions`
        );
        const sessions = getSessionResponse.parsedBody;
        setSessions(sessions);
    }

    useEffect(() => {

        getSessionResponse();
    }, []);

    return (
        <div>
            <Sessions sessions={sessions} getSessions={getSessionResponse} />
            <SessionForm getSessions={getSessionResponse} />
        </div>
    )
}

export default SessionContainer;