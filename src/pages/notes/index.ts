import { Hono } from "hono";

export const notesRoute = new Hono();

notesRoute.get("/notes", (c) => {
	return c.text("This is the /notes route");
});
