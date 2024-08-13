# Appli-Gestion-Backend

Appli-Gestion-Backend is a backend API developed using NestJS, GraphQL, PostgreSQL, and Prisma. This project serves as the backend for managing a specific application.

## Prerequisites

- Node.js (v20 or later)
- Yarn
- PostgreSQL
- Prisma

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@gitlab.com:iarivo/appli-gestion-backend.git
   cd appli-gestion-backend
   ```

## Installation

```bash
$ yarn install
```

## Configure the database

Ensure that PostgreSQL is installed and running. Update the .env file with your database connection information.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
```

## Initialize Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Using GraphQL

A GraphQL interface is available at the following URL once the application is running:

```bash
http://localhost:3000/graphql
```
