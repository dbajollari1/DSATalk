import * as helpers from "../helpers.js";
import { discussions } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';



const create = async (
    discussionId,
    commentId,
    userId, //user id of the author of the comment
    username, //authors username
    content) => {

    discussionId = helpers.checkId(discussionId, "Discussion ID");
    commentId = helpers.checkId(commentId,"Comment ID");
    
    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({ _id: new ObjectId(discussionId) });
    if (discussion === null) throw "Error: No discussion found with that ID";

    // validate the user is a valid ID
    userId = helpers.checkId(userId, "User ID");
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (user === null) throw "Error: No user found with that ID";
    username = helpers.validateUsername(username); 
    const usernameCheck = await userCollection.findOne({ username: username });
    if (usernameCheck === null) throw "Error: No user found with that username";

    
    let commentCheck = await discussionCollection.find({ "comments" : {$elemMatch: { "_id": new ObjectId(commentId)}}}).toArray();
    if(commentCheck === null) throw "Error: No comment found with that ID!"; 

    content = helpers.checkString(content, "Content");
    let currentDate = Date.now();
    const timestamp = currentDate.toISOString();



    newReply = {
        _id: new ObjectId(),
        authorId: new ObjectId(userId),
        authorUsername: username,
        content: content,
        timestamp: timestamp,
    };

    const updatedInfoDiscussion = await discussionCollection.findOneAndUpdate(
        { _id: new ObjectId(discussionId) },
        { $push: { comments: newComment } },
        { returnDocument: 'after' }
    );
    if (updatedInfoDiscussion.lastErrorObject.n === 0) {
        throw "Error: could not update discussion successfully!";
    }


    newComment._id = newComment._id.toString();
    return newComment;
}

const getAll = async ( 
    discussionId 
) => { 
    discussionId = helpers.checkId(discussionId, "Discussion ID");
    
    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({ _id: new ObjectId(discussionId) });
    if (discussion === null) throw "Error: No discussion found with that ID";

    let comments = discussion.comments; 
    comments = comments.map((element) => {
        element._id = element._id.toString();
        return element;
    });
    return comments; 
}


const get = async ( 
    commentId
) => { 
    commentId = helpers.checkId(commentId,"Comment ID");
    const discussionCollection = await discussions();
    
    let comments = await discussionCollection.find({ "comments": { $elemMatch: { "_id": new ObjectId(commentId) } } }).toArray();

    let comment = null; 
    for (let i = 0; i < comments.length; i++ ) { 
        if(comments[i]._id.toString() === commentId) { 
            comments[i]._id = commens[i]._id.toString(); 
            comment = comments[i]._id;
        }
    }
    if(comment === null) { 
        throw "Error: No comment found with that ID!"; 
    }

    return comment; 
}

const remove = async (commentId) => {
    commentId = helpers.checkId(commentId); 

    const discussionCollection = await discussions();
    let discussionId = await discussionCollection.find({ "comments" : {$elemMatch: { "_id": new ObjectId(commentId)}}}).toArray();
    if (discussionId === null) throw "Error: No discussion found with that comment ID";
    discussionId = discussionId[0]._id.toString(); 



    const updatedInfoDiscussion = await discussionCollection.findOneAndUpdate(
        {_id: new ObjectId(discussionId)},
        {$pull: {comments: {_id: new ObjectId(commentId)}}}, 
        {returnDocument: 'after'}
      );
      if (updatedInfoTicket.lastErrorObject.n === 0) {
        throw "Error: could not update discussion successfully!";
      }

      return updatedInfoDiscussion.value;
}


export default { create, getAll, get, remove }; 