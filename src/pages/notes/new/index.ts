import { Hono } from 'hono';

export const noteNewRoute = new Hono<{
	Bindings: {
		DB: D1Database;
	}
}>();

noteNewRoute.get("/notes/new", (c) => {
	return c.html(/* html */`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Note - New</title>
</head>
<body>
	<h1>Note - New</h1>
	<form action="/notes/new" method="POST">
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

noteNewRoute.post("/notes/new", async (c) => {
	const body = await c.req.parseBody();
	const title = body.title;
	const content = body.content;

	if (!title || !content) {
		return c.text('Invalid input', 400);
	}

	const noteId = crypto.randomUUID();
	const query = /* sql */ `
		INSERT INTO notes (id, title, content)
		VALUES (?, ?, ?)
	`;

	await c.env.DB.prepare(query)
		.bind(noteId, title, content)
		.run();

	return c.redirect(`/notes/${noteId}`);
});
