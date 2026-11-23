# Running Tidewater locally

## Requirements

You need Node 22 and a Postgres database. The `TIDEWATER_DB` variable points at it.

## Install

```sh
git clone https://example.com/tidewater.git
cd tidewater
npm install
```

## Configure

Copy the sample config and fill in the database URL:

```sh
cp config/sample.env .env
```

The defaults live in `config/defaults.js`:

```js
export const defaults = {
  port: 8080,
  timezone: "Europe/Oslo",
  pageSize: 50,
};
```

## Seed data

    npm run seed -- --routes 3
    npm run seed -- --vessels 3

## Run

```sh
npm run dev
```

The app listens on port 8080. Open `/departures` to check it works.

## Tests

```sh
npm test
```

## Troubleshooting

If the seed step fails with a timezone error, check `TZ` in your shell.

```text
Error: invalid timezone "Europe/Bergen"
```
