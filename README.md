# music-documents-flow-backend-v2

## Installation

1) Download and install [**PostgreSQL**](https://www.postgresql.org/download/)
2) Create a database called **musicflow** with default configurations.
3) Install [**node.js**](https://nodejs.org/en/) of version 8 or higher:
4) Navigate to project's folder.
5) Create ```/config/config.json``` file with the contents below.<br>
Change _<DATABASE_USERNAME>_ and _<DATABASE_PASSWORD>_ to your database credentials.
```
{
  "development": {
    "username": <DATABASE_USERNAME>,
    "password": <DATABASE_PASSWORD>,
    "database": "musicflow",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": true
  },
  "test": {
    "username": <DATABASE_USERNAME>,
    "password": <DATABASE_PASSWORD>,
    "database": "musicflow_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": <DATABASE_USERNAME>,
    "password": <DATABASE_PASSWORD>,
    "database": "musicflow_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
6) Run this from project's root folder in terminal to install npm modules:
```
npm i
```
7) Start the server via running this in terminal:
```
npm start
```