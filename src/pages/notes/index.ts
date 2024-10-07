import { Hono } from "hono";
import { noteListRoute } from "./list";
import { noteNewRoute } from "./new";
import { noteViewRoute } from "./view";

export const notesRoute = new Hono();

notesRoute.route("/", noteListRoute);
notesRoute.route("/", noteNewRoute);
notesRoute.route("/", noteViewRoute);
