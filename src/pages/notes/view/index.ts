import { Context, Hono } from "hono";

type Env = {
	Bindings: {
		NOTES: KVNamespace;
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
	<h1>${note.title}</h1>
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
): Promise<{ id: string; title: string; content: string; } | null> {
	const noteJson = await c.env.NOTES.get(noteId);
	const note = noteJson ? JSON.parse(noteJson) : null;
	return note;
}
