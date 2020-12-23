## Description

Backend coding challenge task.

## Installation

```bash
$ npm install
```
## Creating database
Make sure mysql is installed on your computer<br />
Enter your sql shell and run to create database<br />
```
  CREATE DATABASE test_eleks;
``` 

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Running e2e tests

```bash
$ npm run test:e2e
```

## Running seeds
After your server was launched successfully run these queries in your sql shell <br />
This will insert a temporary support agents into your database <br />
Run the second command as many times as you wish, changing unique `id` and `email` values <br />
```
  USE test_eleks;
  INSERT INTO support_agent(id, email, password) VALUES (1, 'agent@mail.com', 'secret');
``` 
