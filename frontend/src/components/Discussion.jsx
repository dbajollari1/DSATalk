import React from 'react';
import { useState, useEffect, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Discussion() {
    const [discussion, setDiscussion] = useState([]);
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser.accessToken)
    const { id } = useParams();

    useEffect(() => {
        const fetchDiscussion = async () => {
            const headers = {
                'Authorization': `Bearer ${currentUser.accessToken}`, 
                'Content-Type': 'application/json',
            };
            const res = await axios.get('http://localhost:3000/discussions/discussion/' + id, {headers});
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