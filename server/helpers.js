import { ObjectId } from 'mongodb'; 
import {URL} from 'url';

export const checkId = (id, varName) => {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  }
export const checkString = (strVal, varName) => {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  }



//code adapted from https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
export const validatePassword = (password) => { 
    if (!password) throw "Error: No password provided!";
    if(typeof password  !== 'string') throw 'Error: Password must be a string.';
    password = password.trim();
    if(password.length === 0) throw 'Error: Password string cannot be empty';
    if(password.length < 8) throw "Error: Password must be at least 8 characters long";

    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!(passwordRegex.test(password))) throw "Error: Password must contain at least one uppercase character, one special character, and one digit!"
    return password; 
}   


export const validateUsername = (username) => { 
  if(!username) throw "Error: Username must be provided.";
  if(typeof username  !== 'string') throw 'Error: Username must be a string.';
  username = username.trim();
  //username = username.toLowerCase();
  if(username.length === 0) throw 'Error: Username cannot be empty';

  //check if character is alphanumeric adapted from - https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
  let asciiCode = 0;
  for (let i = 0; i < username.length; i++) {
    asciiCode = username.charCodeAt(i);
    if (!(asciiCode > 47 && asciiCode < 58) && // numeric (0-9)
        !(asciiCode > 64 && asciiCode < 91) && // upper alpha (A-Z)
        !(asciiCode > 96 && asciiCode < 123)) { // lower alpha (a-z)
          throw 'Error: Username must contain valid alphanumeric characters'
    }
  }
  if (username.length < 5) throw 'Error: Username must be at least 5 characters long';
  return username;
}


export const validateName = (name) => { 
    if (!name) throw "Error: Name must be provided."; 
    if(typeof name  !== 'string') throw 'Error: Name must be a string.';
    name = name.trim();
    //username = username.toLowerCase();
    if(name.length === 0) throw 'Error: Name cannot be empty';
    let asciiCode = 0;
    for (let i = 0; i < name.length; i++) {
      asciiCode = name.charCodeAt(i);
      if (!(asciiCode > 64 && asciiCode < 91) && // upper alpha (A-Z)
          !(asciiCode > 96 && asciiCode < 123) && // lower alpha (a-z)
          !(asciiCode == 45) && // hyphen
          !(asciiCode == 39) && // apostrophe 
          ! (asciiCode == 32))  { // space 
            throw 'Error: Name must contain only valid alphabetic characters'
      }
    }
    return name; 
  }




  export const checkPageNum = (pageNum) => { 
    if(typeof pageNum  !== 'number') throw 'Error:  Page number must be a number.';
    if (pageNum < 1) throw 'Error: Page number must be a number greater than 1.'
    if(!pageNum) throw "Error: Page number must be provided.";
    if (Number.isInteger(pageNum) === false) throw "Error: Page number must be a whole number integer.";
    return pageNum; 
  }



  export const checkTitle = (title) => {
    if (!title) throw `Error: You must supply a title!`;
    if (typeof title !== 'string') throw `Error: title must be a string!`;
    title = title.trim();
    if (title.length === 0)
      throw `Error: title cannot be an empty string or string with just spaces`;
    if (!isNaN(title))
      throw `Error: this is not a valid value for title it only contains digits`;
    if (title.length < 5)
      throw `Error: title length must be greater than or equal to 5 characters`;
    return title
  }


  export const checkContent = (content) => {
    if (!content) throw `Error: You must supply content!`;
    if (typeof content !== 'string') throw `Error: content must be a string!`;
    content = content.trim();
    if (content.length === 0)
      throw `Error: content cannot be an empty string or string with just spaces`;
    if (!isNaN(content))
      throw `Error: this is not a valid value for content it only contains digits`;
    if (content.length < 50)
      throw `Error: content length must be greater than or equal to 50 characters`;
    return content
  }




//https://stackoverflow.com/questions/30931079/validating-a-url-in-node-js
  export const checkURL = (url) => {
    if (!url) throw `Error: You must supply a url!`;
    if (typeof url !== 'string') throw `Error: url must be a string!`;
    try {
      new URL(url);
      url = url.trim();
      return url
    } catch (err) {
      throw "Error: invalid url!"
    }
  };


  export const checkTags = (tags) =>  { 
    if(!tags) throw "Error: You must supply a tags array!"; 
    if(!Array.isArray(tags)) throw "Error: tags must be an array!"; 
    if (tags.length < 1) throw "Error: tags array must contain at least one element!";
    for(let i = 0; i < tags.length; i++) { 
      if (typeof tags[i] !== 'string') throw "Error: Tags array can only contain strings!";
      tags[i] = tags[i].trim();
      if (tags[i].length === 0)
        throw "Error: Tags array cannot contain empty strings!"
      if (!isNaN(tags[i]))
        throw "Error: Tags array has a value that only contains digits";
    }
    return tags;
  }