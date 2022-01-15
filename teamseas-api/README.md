TeamSeas Backend API clone (sort of...)

## Dependencies

Have PostgreSQL installed and running locally, update the connection string in
`.env` to match your connection setup.

## Installation

```bash
$ yarn install
```

## Seeding the app

```bash
npx prisma db seed

```

## Running the app

```bash
# development
$ yarn run dev

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
