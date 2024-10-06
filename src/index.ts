import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello from Hono with routing!');
});

app.get('/hello', (c) => {
  return c.text('Hello, this is the /hello route!');
});

app.get('/about', (c) => {
  return c.text('About page');
});

export default app;
