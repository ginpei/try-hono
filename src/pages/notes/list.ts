import { Hono } from "hono";

export const noteListRoute = new Hono();

noteListRoute.get("/notes", (c) => {
	return c.html(
		/* html */`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Note list</title>
</head>
<body>
	<h1>Note list</h1>
	<p>
		<a href="/notes/new">New note</a>
	</p>
  <ul>
    <li>
      <small>(No notes)</small>
    </li>
  </ul>
</body>
</html>
		`.trim()
	);
});
