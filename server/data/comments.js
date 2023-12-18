import * as helpers from "../helpers.js";
import { discussions } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import replyData from './replies.js';
import { ObjectId } from 'mongodb';

const create = async (
    discussionId,
    userId, //user id of the author of the comment
    username, //authors username
    content) => {

    discussionId = helpers.checkId(discussionId, "Discussion ID");

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


    content = helpers.checkString(content, "Content");

    const currentDate = new Date();
    const timestamp = currentDate.toISOString();


    let replies = []
    let newComment = {
        _id: new ObjectId(),
        authorId: new ObjectId(userId),
        authorUsername: username,
        content: content,
        timestamp: timestamp,
        replies: replies
    };

    const updatedInfoDiscussion = await discussionCollection.findOneAndUpdate(
        { _id: new ObjectId(discussionId) },
        { $push: { comments: newComment } },
        { returnDocument: 'after' }
    );
    if (updatedInfoDiscussion.value === null) {
        throw "Error: could not update discussion successfully!";
    }


    newComment._id = newComment._id.toString();
    newComment.authorId = newComment.authorId.toString();
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

    for (let i = 0; i < comments.length; i++) {
        for (let j = 0; j < comments[i].replies.length; j++) {
            comments[i].replies[j]._id = comments[i].replies[j]._id.toString();
        }
    }
    return comments;
}


const get = async (
    commentId
) => {
    commentId = helpers.checkId(commentId, "Comment ID");
    const discussionCollection = await discussions();

    const comments = await discussionCollection.find({ "comments": { $elemMatch: { "_id": new ObjectId(commentId) } } }).toArray();
    if (comments === null) {
        throw "Error: No comment found with that ID!";
    }
    let comment = comments[0].comments.filter((element) => {
        return element._id.toString() === commentId;
    });
    
    comment = comment[0];
    comment._id = comment._id.toString();
    comment.authorId = comment.authorId.toString();
    let replies = comment.replies;
    replies = replies.map((element) => {
        element._id = element._id.toString();
        return element;
    });
    comment.replies = replies;
    return comment;
}

const remove = async (discussionId,commentId) => {
    discussionId = helpers.checkId(discussionId, "Dicussion ID");
    commentId = helpers.checkId(commentId, "Comment ID");

    const discussionCollection = await discussions();
    const thisDicussion = await discussionCollection.find({_id: new ObjectId(discussionId)});
    if (thisDicussion === null) throw "Error: No discussion found with that ID found!";
    let checkComment = await discussionCollection.find({ "comments": { $elemMatch: { "_id": new ObjectId(commentId) } } }).toArray();
    if (checkComment === null) throw "Error: No commment with that ID found!";
    discussionId = discussionId[0]._id.toString();

    //check to see if comments have replies and if so delete those replies 
    if (checkComment.replies.length !== 0) { 
        for(let i = 0;i < checkComment.replies.length; i++) { 
            let deletedReply = await replyData.remove(discussionId,commentId,checkComment.replies[i]._id.toString());
        }
    }
    const updatedInfoDiscussion = await discussionCollection.findOneAndUpdate(
        { _id: new ObjectId(discussionId) },
        { $pull: { comments: { _id: new ObjectId(commentId) } } },
        { returnDocument: 'after' }
    );
    if (updatedInfoTicket.lastErrorObject.n === 0) {
        throw "Error: could not update discussion successfully!";
    }
    const updatedDiscussion = await discussionCollection.find({_id: new ObjectId(discussionId)});
    return updatedDiscussion;
}


export default { create, getAll, get, remove }; 