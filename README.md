# Appli-Gestion-Backend

Appli-Gestion-Backend is a backend API developed using NestJS, GraphQL, PostgreSQL, and Prisma. This project serves as the backend for managing a specific application.

## Prerequisites

- Node.js (v20 or later)
- Yarn
- PostgreSQL

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@gitlab.com:iarivo/appli-gestion-backend.git
   cd appli-gestion-backend
   ```

2. **install dependencies :**

   ```bash
   yarn install
   ```

## Configuration

### Environment

Create an **.env** file and use the **.env.template** file as inspiration.

### Database configuration

#### Generate prisma client

```bash
yarn prisma generate
```

#### Generate database

```bash
yarn prisma db push
```

#### Reset database

```bash
yarn prisma migrate reset -f
```

#### Seed database with test data

```bash
yarn seed:test
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

## Start application with docker

### Prerequisites

You must have docker and docker compose installed on your machine

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running application

- **Development mode:**

```bash
docker compose -f docker-compose.dev.yml down
```

- **Production mode:**

```bash
docker compose -f docker-compose.prod.yml down
```

#### ***NB:***

> if you want to execute a command in the container:

```bash
docker compose exec <container-name-or-id> <commande>
```

example: **docker compose exec db-dev "yarn prisma migrate reset -f"**

## Using GraphQL

A GraphQL interface is available at the following URL once the application is running:

```bash
http://localhost:3000/graphql
```
