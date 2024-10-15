# Try Hono

## Develop

```console
$ npm run dev
```

## Deploy

[Cloudflare Dashboard](https://dash.cloudflare.com/) > Workers & Pages > try-hono

```console
$ npm run deploy
```

```console
$ npx wrangler d1 migrations create try-hono <migration title> --remote
$ npx wrangler d1 migrations apply try-hono
```
