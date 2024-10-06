import { ErrorHandler, Hono } from "hono";

export const errorHandler: ErrorHandler = (err, c) => {
	console.error(err);
	return c.text("500", 500);
};
