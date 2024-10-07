import { Hono } from "hono";

export const noteNewRoute = new Hono();

noteNewRoute.get("/notes/new", (c) => {
	return c.html(
		/* html */`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Note - New</title>
</head>
<body>
	<h1>Note - New</h1>
	<form action="/404" method="POST">
		<div>
			<label>
				Title:
				<input type="text" name="title" required>
			</label>
		</div>
		<div>
			<label>
				Content:
				<br />
				<textarea name="content" required></textarea>
			</label>
		</div>
		<div>
			<button type="submit">Create</button>
		</div>
	</form>
</body>
</html>
		`.trim()
	);
});
