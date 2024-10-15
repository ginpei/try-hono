import { Context, Hono } from "hono";

type Env = {
	Bindings: {
		DB: D1Database;
	};
};

export const noteViewRoute = new Hono<Env>();

noteViewRoute.get("/notes/:note_id", async (c) => {
	const noteId = c.req.param('note_id');
	const note = await getNoteById(c, noteId);

	if (!note) {
		return c.notFound();
	}

	return c.html(
		/* html */`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Note - ${note.title}</title>
</head>
<body>
	<p>
		<a href="/notes">Notes</a>
	</p>
	<h1>${note.title}</h1>
	<p>
		<small>Created at ${new Date(note.created_at).toLocaleString()}</small>
	</p>
	<pre>${note.content}</pre>
</body>
</html>
		`.trim()
	);
});

// TODO extract
async function getNoteById(
	c: Context<Env>,
	noteId: string,
): Promise<{ id: string; title: string; content: string; created_at: string } | null> {
	const query = /* sql */ `
		SELECT id, title, content, created_at FROM notes
		WHERE id = ?
	`;

	const note = await c.env.DB
		.prepare(query)
		.bind(noteId)
		.first<{ id: string; title: string; content: string; created_at: string }>();
	return note;
}
