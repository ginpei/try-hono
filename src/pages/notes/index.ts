import { Hono } from "hono";
import { noteListRoute } from "./list";
import { noteNewRoute } from "./new";

export const notesRoute = new Hono();

notesRoute.route("/", noteListRoute);
notesRoute.route("/", noteNewRoute);
