import * as helpers from "../helpers.js";
import { discussions } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';



const create = async (
    title,
    userId,
    username,
    content,
    tags,
    image,
    url
) => {
    title = helpers.checkTitle(title); 
    userId = helpers.checkId(userId,"User ID");
    //username = helpers.validateUsername(username);
    content = helpers.checkContent(content);
    if(tags) { 
       tags = helpers.checkTags(tags); 
    } else { 
        tags = [];
    }
    if(image) { 
        image = "" //will change later
    } else { 
        image = ""
    }
    if (url) { 
        url = helpers.checkURL(url); 
    } else { 
        url = ""
    }
    image = "" //for now always set image to empty will need to configure s3 bucket later

    const userCollection = await users();
    const userCheck1 = await userCollection.findOne({ username: username });
    if (!userCheck1) throw "Error: Cannot find user with that username!";
    const userCheck2 = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!userCheck2) throw "Error: Cannot find user with that id!";

    const currentDate = new Date();
    const timestamp = currentDate.toISOString();


    let comments = []; 
    let likes = []; 
    let user = {"_id": new ObjectId(userId), "username": username}
    let newDiscussion = { 
        title: title, 
        user: user, 
        content: content, 
        tags: tags,
        image: "", 
        url: url,
        timestamp: timestamp,
        likes: likes,
        comments: comments
    }; 

    const discussionCollection = await discussions();
    const insertInfo = await discussionCollection.insertOne(newDiscussion);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Error: Could not add new discussion!';
    const newId = insertInfo.insertedId.toString();
  
    const discussion = await get(newId);
    return discussion;
}

const getAll = async (pageNum) => {
    //code adapted from, getAllDogs() function in, https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
    let skipVal = 0;
    let limitVal = 10; 
    if (pageNum > 1) {
        for(let i = 1; i < pageNum; i++) { 
            skipVal += 50; 
        }
    }
    const discussionCollection = await discussions();
    let discussionList = await discussionCollection.find({}).skip(skipVal).limit(limitVal).toArray();
    if (!discussionList) throw 'Error: Could not get all discussion!';
    
    discussionList = discussionList.map((element) => {
        element._id = element._id.toString();
        element.user._id = element.user._id.toString();
        return element;
    });
    return discussionList;
};



const get = async (id) => {
    //code adapted from, getDogById(id) function in, https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
    if (!id) throw "Error: No ID passed to function!";
    id = helpers.checkId(id, "Discussion ID")
    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({ _id: new ObjectId(id) });
    if (discussion === null) throw "Error: No discussion found with that ID";
    discussion._id = discussion._id.toString();
    discussion.user._id = discussion.user._id.toString();
    discussion.comments = discussion.comments.map((element) => {
        element._id = element._id.toString();
        element.authorId= element.authorId.toString();
        element.replies = element.replies.map((elementReply) => {
            elementReply._id = elementReply._id.toString();
            elementReply.authorId= elementReply.authorId.toString();
            return elementReply;
        });
        return element;
    });
    return discussion;
};


const remove = async (id) => {
    //code adapted from, removeDog(id) function in, https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
    if (!id) throw "Error: No ID passed to function!";
    id = helpers.checkId(id, "ID")
    const discussionCollection = await discussions();
    console.log("inside func ",id)
    const deletionInfo = await discussionCollection.findOneAndDelete({
        _id: new ObjectId(id)
    });

    if (!deletionInfo || !deletionInfo._id) {
        throw `Could not delete discussion with id of ${id}`;
    }
    return `${deletionInfo.title} has been successfully deleted!`;
};


const update = async (
    discussionId,
    title,
    userId,
    username,
    content,
    tags,
    image,
    url
) => {
    discussionId = helpers.checkId(discussionId,"Discussion ID");
    userId = helpers.checkId(userId, "User ID"); 
    username = helpers.validateUsername(username); 

    const userCollection = await users();
    const userCheck1 = await userCollection.findOne({ username: username });
    if (!userCheck1) throw "Error: Cannot find user with that username!";
    const userCheck2 = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!userCheck2) throw "Error: Cannot find user with that id!";

    const discussion = await get(discussionId);
    if (discussion.user._id.toString() !== userId) throw "Error: Cannot update other users discussion!"
    if (discussion.user.username !== username) throw "Error: Cannot update other users discussion!"
    


    userId = helpers.checkId(userId,"User ID");
    usernmae = helpers.validateUsername(username);
    content = helpers.checkContent(content);

    if (title !== null) { 
        title = helpers.checkTitle(title); 
        if (title === discussion.title) throw "Error: Cannot update discussion field with same values as before!";
    } else { 
        title = discussion.title; 
    }

    if (content !== null) { 
        content = helpers.checkContent(content); 
        if (content === discussion.content) throw "Error: Cannot update discussion field with same values as before!";
    } else { 
        content = discussion.content;
    }
    
    if(tags != null) { 
        tags = helpers.checkTags(tags); 
    } else { 
        tags = discussion.tags;
    } 

    if (url !== null) { 
        url = helpers.checkURL(url); 
        if (url === discussion.url) throw "Error: Cannot update discussion field with same values as before!";
    } else { 
        url = discussion.url;
    }


    // will need to figure out logic to deal with s3 bucket later
    // if (image !== null) { 
    //     image = helpers.checkImage(image);  
    //     if (image === discussion.image) throw "Error: Cannot update discussion field with same values as before!";
    // } else { 
    //     image = discussion.image;
    // }

    let updatedDiscussion = { 
        title: title, 
        user: discussion.user, 
        content: content, 
        tags: tags,
        image: discussion.image, 
        url: url,
        timestamp: discussion.timestamp,
        likes: discussion.likes,
        comments: discussion.comments
    }; 

    const discussionCollection = await discussions();
  
    const updatedInfo = await discussionCollection.findOneAndUpdate(
      {_id: new ObjectId(discussionId)},
      {$set: updatedDiscussion},
      {returnDocument: 'after'}
    );

    const newDiscussion = await get(discussionId);
    return newDiscussion;
};

const addLike = async (
    discussionId, 
    userId, 
    username
) => {
    if (!discussionId || !userId || !username) throw "Error: All fields need to have valid values!";
    discussionId = helpers.checkId(discussionId, "Discussion ID");
    userId = helpers.checkId(userId, "userId");
    username = helpers.validateUsername(username,"username");

    const userCollection = await users();
    const userCheck1 = await userCollection.findOne({ username: username });
    if (!userCheck1) throw "Error: Cannot find user with that username!";
    const userCheck2 = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!userCheck2) throw "Error: Cannot find user with that id!";
  
    const discussionCollection = await discussions();
    const discussion = await discussionCollection.findOne({ _id: new ObjectId(discussionId) });
    if (discussion === null) throw "Error: No discussion found with that ID";

    let curLikes = discussion.likes; 
    let addLike = true; 
    let removeLike = false
    for(let i = 0; i < curLikes.length; i++) { 
        if (userId === curLikes[i]) { 
            removeLike = true; 
            addLike = false;
        }
    }
    let updatedInfo = 0;
    if (addLike) { 
        updatedInfo = await discussionCollection.findOneAndUpdate(
            { _id: new ObjectId(discussionId) },
            { $push: { likes: userId } },
            { returnDocument: 'after' }
          );
    } else if (removeLike) { 
        updatedInfo = await discussionCollection.findOneAndUpdate(
            { _id: new ObjectId(discussionId) },
            { $pull: { likes: userId } },
            { returnDocument: 'after' }
          );
    }


    const updatedDiscussionCollection = await discussions();
    const updatedDiscussion = await updatedDiscussionCollection.findOne({ _id: new ObjectId(discussionId) });
    updatedDiscussion._id = updatedDiscussion._id.toString();
    
    return updatedDiscussion; 
}  

const getAllDiscussions = async () => {



    const discussionCollection = await discussions();
    let discussionList = await discussionCollection.find({}).toArray();
    if (!discussionList) throw 'Error: Could not get all discussions!';
    
    discussionList = discussionList.map((element) => {
        element._id = element._id.toString();
        element.user._id = element.user._id.toString();
        element.comments = element.comments.map((elementComment) => {
            elementComment._id = elementComment._id.toString();
            elementComment.authorId= elementComment.authorId.toString();
            elementComment.replies = elementComment.replies.map((elementReply) => {
                elementReply._id = elementReply._id.toString();
                elementReply.authorId= elementReply.authorId.toString();
                return elementReply;
            });
            return elementComment;
        });
        return element;
    });
    return discussionList;
}

export default {create, getAll, get, remove, update, addLike, getAllDiscussions}; 
