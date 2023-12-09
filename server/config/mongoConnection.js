import { MongoClient } from 'mongodb';
import { mongoConfig } from './settings.js';
import * as dotenv from 'dotenv';
dotenv.config();

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {

    try {
      console.log('mongodb connecting...');
      //_connection = await MongoClient.connect(mongoConfig.serverUrl);
      //_db = _connection.db(mongoConfig.database);
      _connection = await MongoClient.connect(process.env.SERVER_URL);
      _db = _connection.db(process.env.DATABASE);   
    } catch (error) {
      console.log(error);
    }

  }

  return _db;
};

const closeConnection = async () => {
  await _connection.close();
};

export { dbConnection, closeConnection };