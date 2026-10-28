# statuspage

A static status page for our services, rebuilt every five minutes from the
health checks and published to the CDN.

- `src/`: fetches the checks and renders `public/index.html`
- `public/`: the page's static assets
- `vendor/spoon-knife`: the shared stylesheet (git submodule)
