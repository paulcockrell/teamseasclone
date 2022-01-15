TeamSeas clone (sort of...)

From the [following tutorial](https://www.youtube.com/watch?v=lddaR8Y-gko&ab_channel=MariusEspejo) with some mods on the way.

The front end is made with Typescript + NextJS12 + ChakraCSS, and communicates to the backend with GraphQL and websockets.

The back end is made with Typescript + NestJS, and exposes a GraphQL API, storing data in a PostgreSQL database.

## Run

In each subfolder (teamseas and teamseas-api) run the following

```bash
yarn dev
```

## Use

Go to [http://localhost:3000](http://localhost:3000) and start pretending to donate, and watch the magic happen.
