# music-documents-flow-backend-v2

## Installation

1) Download and install [**PostgreSQL**](https://www.postgresql.org/download/)
2) Create a database called **musicflow** with default configurations.
3) Install [**node.js**](https://nodejs.org/en/) of version 8 or higher:
4) Navigate to project's folder.
5) Create ```/config/config.json``` file with the contents below.<br>
Change <EMAIL_ADDRESS>, <EMAIL_PASSWORD> to your email credentials and set <EMAIL_SERVICE> to your email's domain (for instance, _gmail_). This email will be used to send congratulation-emails to birthday users.<br>
Change <SERVER_SECRET> to your server's secret which is used to generate authentication tokens.<br>
```
{
  "mailer": {
    "service": <EMAIL_SERVICE>,
    "user": <EMAIL_ADDRESS>,
    "pass": <EMAIL_PASSWORD>
  },

  "secret": <SERVER_SECRET>
}

```
6) Create ```/config/database/config.json``` file with the contents below.<br>
Change _<DATABASE_USERNAME>_ and _<DATABASE_PASSWORD>_ to your database credentials.<br>
If you don't want to see SQL logs in terminal set _logging_ option to _false_ in the contents below.<br>
```
{
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "musicflow",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": true
  },
  "test": {
    "username": "postgres",
    "password": "root",
    "database": "musicflow_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "root",
    "database": "musicflow_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

```
7) Run this from project's root folder in terminal to install npm modules:
```
npm i
```
8) Start the server via running this in terminal:
```
npm start
```