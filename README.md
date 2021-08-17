# Spotify API Coding Challenge

This is an open API that utilizes the Spotify API to grab track data.

## Send Requests to API Server Option #1
I have deployed the application to a heroku cloud server so that it can be publicly accessible. Skip the installation process and use a running cloud server at [https://spotify-cc.herokuapp.com](https://spotify-cc.herokuapp.com). You can view the API documentation at [https://spotify-cc.herokuapp.com/api-docs](https://spotify-cc.herokuapp.com/api-docs).

## Send Requests to API Server Option #2

If you have docker installed, clone the repository and run this command:

```bash
docker compose up
```
Once it's running, open Postman or any REST Client of your choice and make a GET request to the host [http://localhost:8082](http://localhost:8082). You can view the API documentation at [http://localhost:8082/api-docs](http://localhost:8082/api-docs)

## Send Requests to API Server Option #3
- Install [Node.js](https://nodejs.org/en/)
- Install [PostgresSQL](https://www.postgresql.org/) and create a database with your own configuration
- Create a Spotify Developer Account
- Create a .env file in the api-service/ directory with your database configurations as well your spotify client id and client secret.
```bash
#to run the project, open a terminal and run this command in the api-service dir
npm run start:dev
````