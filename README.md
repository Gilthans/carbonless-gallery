# widget-client

A small client for the widget store API.

## Options

| Variable | Default | What it does |
| --- | --- | --- |
| `WIDGET_URL` | `https://api.example.com` | The API's base URL |
| `WIDGET_TOKEN` | none | A bearer token |
| `WIDGET_CURRENCY` | `USD` | How prices are shown |
| `WIDGET_TIMEOUT_MS` | `10000` | How long one request may take |

## Retries

5xx answers are retried up to 5 times, with exponential backoff.
