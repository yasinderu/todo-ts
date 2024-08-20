# Todo backend application with NodeJS, PostgreSQL, Typescript and Docker

A simple todo application

### Technologies

1. NodeJS
2. Typescript
3. PosgreSQL
4. Docker
5. Docker Compose
6. Jest

### Concept

- REST API principals
  - CRUD
  - HTTP method
- JWT
- Authentication & authorization middleware
- Raw SQL query
- Unit testing with Jest

### How to run in local

Since this application is using docker, you need to have Docker already installed in you local machine. Below command will install all the dependencies, make migrations to database and run the application

```
docker compose up --build
```

### How to test

This application is using Jest as unit testing framework. You can test the application by running below command

```
npm run test
```

The test coverage for this application is only covering the functionality of each endpoint. All the model and database interaction is mocked.
