# Inventory service

A small service that keeps stock counts for a warehouse and answers
how many of each item are on hand.

## Getting started

Install the dependencies and start the service:

```sh
npm install
npm start
```

The service listens on port 8080 by default.

## Configuration

Settings come from environment variables:

- `PORT`: the port to listen on.
- `DB_URL`: where the stock database lives.
- `LOG_LEVEL`: one of `debug`, `info`, `warn`, `error`.


## Endpoints

### GET /items

Lists every item with its count.

### GET /items/:id

One item, or 404 when there is none.

### POST /items/:id/adjust

Adds to or takes from an item's count. The body is `{ "by": <number> }`.
A count never goes below zero: the request fails instead.

## Development

Run the tests with `npm test`. They start a throwaway database and
remove it afterwards.

Lint with `npm run lint`.

## License

MIT
