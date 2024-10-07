import { Hono } from "hono";

export const homeRoute = new Hono();

homeRoute.get("/", (c) => {
	return c.html(
		/* html */`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Home</title>
</head>
<body>
	<h1>Hello!</h1>
	<p>
		<a href="/notes">Notes</a>
	</p>
</body>
</html>
		`.trim()
	);
});
