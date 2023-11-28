import * as helpers from "../helpers.js";
import { discussions } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';


/* will change currently same code as lab 1, will use as a shell */
const create = async (
    title,
    userId,
    username,
    content,
    image,
    url
) => {
    title = helpers.checkTitle(title); 
    userId = helpers.checkId(userId,"User ID");
    usernmae = helpers.validateUsername(username);
    content = helpers.checkContent(content);
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

    let replies = []; 
    let likes = []; 
    let user = {"_id": new ObjectId(userId), "username": username}
    let newDiscussion = { 
        title: title, 
        user: user, 
        content: content, 
        image: "", 
        url: url,
        likes: likes,
        replies: replies
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
    return discussion;
};


const remove = async (id) => {
    //code adapted from, removeDog(id) function in, https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
    if (!id) throw "Error: No ID passed to function!";
    id = helpers.checkId(id, "ID")
    const discussionCollection = await discussions();

    const deletionInfo = await discussionCollection.findOneAndDelete({
        _id: new ObjectId(id)
    });
    if (deletionInfo.lastErrorObject.n === 0) {
        throw `Could not delete discussion with id of ${id}`;
    }
    return `${deletionInfo.value.title} has been successfully deleted!`;
};


const update = async (
    discussionId,
    title,
    userId,
    username,
    content,
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
        image: discussion.image, 
        url: url,
        likes: discussion.likes,
        replies: discussion.replies
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

export default {create, getAll, get, remove, update, addLike}; 
