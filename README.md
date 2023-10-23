# Node-Express-Typescript-PostgreSQL Games App

This project is designed for the management of football games. It offers three endpoints that support CRUD operations: games, locations, and teams.

You can access pre-existing data for locations and teams to create new games. When a new game is created, two default scores are generated, one for each team. Deleting a location or team triggers a cascade delete action.



## Prerequisite
- Node 18.17.1
- PostgreSQL

## Getting started
- Clone the repository
```
git clone git@github.com:Miranda13/games-app-back.git
```
- Install dependencies
```
cd games-app-back
npm install
```
- Run local development server
```
npm run dev
```
## ENV variables
The project uses environment variables. To add environment variables create a `.env` file in the root folder of the project. DB_CONNECTION and configure the connection with your local database

DB_CONNECTION = postgres://USER:PASSWORD@localhost/DB

- Using your browser
```
You can check the swagger documentation to each endpoint:

- http://localhost:8080/api-docs/

```
- To use ESLint
```
npm run lint
```

## Project structure
```
│   .env
│   .eslintrc.json
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
├───interfaces
│       games.interface.ts
│       locations.interface.ts
│       scores.interface.ts
│       service-response.interface.ts
│       teams.interface.ts
│
└───src
    │   index.ts
    │
    ├───commons
    │       http-exception.ts
    │
    ├───controllers
    │       games.controller.ts
    │       health.controller.ts
    │       locations.controller.ts
    │       teams.controller.ts
    │
    ├───db
    │       index.ts
    │
    ├───middlewares
    │       error.middleware.ts
    │       index.ts
    │       not-found.middleware.ts
    │
    ├───models
    │       game.model.ts
    │       location.model.ts
    │       team.model.ts
    │
    ├───repositories
    │       games.rep.ts
    │       locations.rep.ts
    │       scores.rep.ts
    │       teams.rep.ts
    │
    ├───routers
    │       games.routes.ts
    │       health.routes.ts
    │       index.ts
    │       locations.routes.ts
    │       teams.routes.ts
    │
    └───services
            games.services.ts
            locations.services.ts
            scores.services.ts
            teams.services.ts

```

- Each interface defines the data structure of objects awaiting internal processing.

- The Model defines how the data structure of objects is constructed for a response, and is used for get responses from database.

- Controllers receive and process user requests, performing basic validation.

- Repositories establish a direct connection with the database and specify every query to be executed.

- Services handle the business logic and required actions, including in-depth validations.
