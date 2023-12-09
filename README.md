# DSATalk
CS554 - Final Project

## Running the application with Docker - Note, this has only been tested on MAC with apple silicon chip
### Server
1. Go to server directory and run the following command in terminal.Following command assumes you named the image "server"\
    `docker build -t [name of image] .`
2. Now run the image with the follwoing command\
    `docker run --rm -it -p 3000:3000/tcp server:latest `
### Frontend
1. Go to frontend directory and run the following command in terminal\
    `docker build -t [name of image] .`
2. Now run the image with the follwoing command. Following command assumes you named the image "frontend"\
    `docker run --rm -it -p 5173:5173/tcp frontend:latest `
