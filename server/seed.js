import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import discussions from "./data/discussions.js";
import users from "./data/users.js";

const db = await dbConnection();
await db.dropDatabase();



await closeConnection();