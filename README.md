# DSATalk
CS554 - Final Project

## How to run the application
- First you must install docker, can be found here [https://docs.docker.com/desktop/install/mac-install/]
 - Also please note that the following has only been tested with a Macbook Pro using apple silicon and since this application is using redis, we need to run a dockerized version of it locally. This is handled in the docker compose file, but make sure to stop your local redis instance if running with docker
 - To run the application locally(without docker) you can pull the code from github using this command <br>
 ```git clone git@github.com:dbajollari1/DSATalk.git```
  - Then you can go into the server folder and run the following command to populate the database with dummy data, and then run the server <br>
1. ```npm install```
2. ```npm run seed```
3. ```npm run start```
 - Next go into the frontend and run the command <br>
 1. ```npm install```
 2. ```npm run dev```
- When we submit the project we will supply the env file with the correct values, so there is no need to manually populate it

## Running it with docker
1. First go to the server folder and run the following command to populate the database <br>
    ```npm run seed```
2. Then in the root of the project folder run the following command in your terminal. This will run the commands to build the docker container for the frontend,server, and redis instance <br>
    ```docker-compose up```
3. After the above command the frontend and server should be running. The frontend will be on port 5173 and the server on port 3000. Once you are in the frontend of the application you can create a user(done with firebase) and start using the application to view and create dicsussions
4. To stop the docker containers from running you can run the following command. After running the command you can then manually delete them in the docker desktop app<br>
    ```docker-compose down```
5. If you ever want to get details about the current running docker containers you can use the following command. You can also see the running containers in the Docker VSCode extension or the desktop app  <br>
    ```docker-compose ps```
6. Important note: When running the application in docker container navigate to the env file and make sure the value for REDIS_HOST is my-redis-service. This will tell the application that we are running redis from the docker container. If you would like the run on your local machine have the value be 127.0.0.1

- The code for the docker compose file was adapted from the following sources
    1. [https://chadsmith-software.medium.com/docker-service-inter-communication-setting-up-redis-and-a-web-app-with-docker-compose-b1cf353eb7a9]
    2. [https://dev.to/marcelkatz/nodejs-and-redis-deployed-in-docker-containers-using-docker-compose-then-load-balancing-the-nodejs-servers-with-nginx-4omc]
    3. [https://collabnix.com/dockerizing-a-nodejs-express-redis-with-nginx-proxy-using-docker-compose/]
    4. [https://stackoverflow.com/questions/56533022/setting-up-node-with-redis-using-docker-compose]

## Important Notes about Users, Dockerfiles and .env file

### Users
1. Our project uses Firebase Authenticaion for storing and managing user. 
2. When you run the seed file the database will be populated with a few users. The following user is the one designated for testing: 
- username: "dsa"
- email: "dsa123@gmail.com" 
- password: "Dsa123!@#"
3. You will be able to login in with the above user if the application was correctly run. If you want you can also just create a new user to use the application 

### Dockerfiles and .env files