# DSATalk
CS554 - Final Project

## Running the application with Docker 
 - First you must install docker, can be found here [https://docs.docker.com/desktop/install/mac-install/]
 - Also please note that the following has only been tested with a Macbook Pro using apple silicon
### Server
1. Go to server directory and run the following command in terminal.\
    `docker build -t [name of image] .`
2. Now run the image with the follwoing command.  Following command assumes you named the image "server".\
    `docker run --rm -it -p 3000:3000/tcp server:latest `
### Frontend
1. Go to frontend directory and run the following command in terminal\
    `docker build -t [name of image] .`
2. Now run the image with the follwoing command. Following command assumes you named the image "frontend"\
    `docker run --rm -it -p 5173:5173/tcp frontend:latest `
