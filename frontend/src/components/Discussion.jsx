import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Discussion() {
    const [discussion, setDiscussion] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchDiscussion = async () => {
            const res = await axios.get('http://localhost:3000/discussions/discussion/' + id);
            setDiscussion(res.data);
        }
        fetchDiscussion();
    }, []);

    return (
        <div>
                <h1>{discussion.title}</h1>
        </div>
    )
}

export default Discussion;