import React from 'react';
import { useState, useEffect, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Discussion() {
    const [discussion, setDiscussion] = useState([]);
    const {currentUser} = useContext(AuthContext);
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
                <h3>Posted By {discussion.user?.username}</h3> 
                <p>{discussion.content}</p>
                <h3>Likes: {discussion.likes?.length}</h3>
                <div>
                    <h3>Comments</h3>
                    {discussion.comments?.map((comment) => (
                        <div key={comment._id}>
                            <h4>{comment.user?.username}</h4>
                            <p>{comment.content}</p>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default Discussion;