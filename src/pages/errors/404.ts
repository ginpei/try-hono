import { NotFoundHandler } from "hono";

export const notFoundHandler: NotFoundHandler = (c) => {
	return c.text("Oops 404!");
};
