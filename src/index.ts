import { Hono } from 'hono';
import { notFoundHandler } from './pages/errors/404';
import { errorHandler } from './pages/errors/error';
import { notesRoute } from './pages/notes';

const app = new Hono();

app.route("/", notesRoute);
app.notFound(notFoundHandler);
app.onError(errorHandler);

app.get("/500", (c) => {
	throw new Error("Testing 500");
});

app.get('/', (c) => {
  return c.text('Hello from Hono with routing!');
});

export default app;
