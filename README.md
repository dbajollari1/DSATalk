# DSATalk
CS554 - Final Project

## Running the application with Docker 
- Server 
1. Go to server directory and run the following command in terminal 
    `docker build -t [name of image] .`
2. Now run the image with the follwoing command 
    `docker run --rm -it -p 3000:3000/tcp server:latest `
- Frontend
1. Go to frontend directory and run the following command in terminal 
    `docker build -t [name of image] .`
2. Now run the image with the follwoing command 
    `docker run --rm -it -p 5173:5173/tcp frontend:latest `
