import * as helpers from "../helpers.js";
import { discussions } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';



const create = async (
    discussionId,
    commentId,
    userId, //user id of the author of the reply
    username, //authors username
    content) => {

    discussionId = helpers.checkId(discussionId, "Discussion ID");
    commentId = helpers.checkId(commentId, "Comment ID");

    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({ _id: new ObjectId(discussionId) });
    if (discussion === null) throw "Error: No discussion found with that ID";

    let validCommentIdFlag = false;
    for (let i = 0; i < discussion.comments.length; i++) {
        if (discussion.comments[i]._id.toString() === commentId) {
            validCommentIdFlag = true
        }
    }
    if (!validCommentIdFlag) throw "Error: No comment found with that comment ID in this disucssion!";

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


    let newReply = {
        _id: new ObjectId(),
        authorId: new ObjectId(userId),
        authorUsername: username,
        content: content,
        timestamp: timestamp,
    };

    const updatedInfoDiscussion = await discussionCollection.findOneAndUpdate(
        {
            _id: new ObjectId(discussionId),
            'comments._id': new ObjectId(commentId),
        },
        { $push: { 'comments.$.replies': newReply } },
        { returnDocument: 'after' }
    );
    if (updatedInfoDiscussion.value === null) {
        throw "Error: could not update discussion successfully!";
    }

    newReply._id = newReply._id.toString();
    newReply.authorId = newReply.authorId.toString();
    return newReply;
}




const get = async (discussionId, commentId, replyId) => {
    commentId = helpers.checkId(commentId, "Comment ID");
    discussionId = helpers.checkId(discussionId, "Discussion ID");
    replyId = helpers.checkId(replyId, "Reply ID");
    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({ _id: new ObjectId(discussionId) });
    if (discussion === null) throw "Error: No discussion found with that ID";

    let validCommentIdFlag = false;
    let curComments = {};
    for (let i = 0; i < discussion.comments.length; i++) {
        if (discussion.comments[i]._id.toString() === commentId) {
            validCommentIdFlag = true
            curComments = discussion.comments[i];
        }
    }
    if (!validCommentIdFlag) throw "Error: No comment found with that comment ID in this disucssion!";

    let validReplyIdFlag = false;
    let reply = {}
    for (let i = 0; i < curComments.replies.length; i++) {
        if (curComments.replies[i]._id.toString() === replyId) {
            reply = curComments.replies[i];
            validReplyIdFlag = true
            break;
        }
    }
    if (!validReplyIdFlag) throw "Error: No reply found with that reply ID in this disucssion!";

    reply._id = reply._id.toString();
    reply.authorId = reply.authorId.toString();
    return reply;
}

const remove = async (discussionId, commentId, replyId) => {
    commentId = helpers.checkId(commentId, "Comment ID");
    discussionId = helpers.checkId(discussionId, "Discussion ID");
    replyId = helpers.checkId(replyId, "Reply ID");

    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({ _id: new ObjectId(discussionId) });
    if (discussion === null) throw "Error: No discussion found with that ID";

    let validCommentIdFlag = false;
    let curComments = {};
    for (let i = 0; i < discussion.comments.length; i++) {
        if (discussion.comments[i]._id.toString() === commentId) {
            validCommentIdFlag = true
            curComments = discussion.comments[i];
        }
    }
    if (!validCommentIdFlag) throw "Error: No comment found with that comment ID in this disucssion!";

    let validReplyIdFlag = false;
    for (let i = 0; i < curComments.replies.length; i++) {
        if (curComments.replies[i]._id.toString() === replyId) {
            validReplyIdFlag = true
            break;
        }
    }
    if (!validReplyIdFlag) throw "Error: No reply found with that reply ID in this disucssion!";



    const updatedInfoDiscussion = await discussionCollection.findOneAndUpdate(
        {
            _id: new ObjectId(discussionId),
            'comments._id': new ObjectId(commentId),
        },
        { $pull: { 'comments.$.replies': { _id: new ObjectId(replyId) } } },
        { returnDocument: 'after' }
    );

    if (updatedInfoDiscussion.value === null) {
        throw 'Error: could not update discussion successfully!';
    }

    return updatedInfoDiscussion.value;
}


export default { create, get, remove }; 