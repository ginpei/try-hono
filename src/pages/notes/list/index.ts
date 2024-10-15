import { Context, Hono } from "hono";

type Env = {
	Bindings: {
		DB: D1Database;
	};
};

export const noteListRoute = new Hono<Env>();

noteListRoute.get("/notes", async (c) => {
	const notes = await getNotes(c);

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
		${notes.map((note) => /* html */`
			<li>
				<a href="/notes/${note.id}">${note.title}</a>
			</li>
		`.trim()).join('\n')}
  </ul>
</body>
</html>
		`.trim()
	);
});

// TODO extract
async function getNotes(c: Context<Env>): Promise<{ id: string; title: string; }[]> {
	const query = /* sql */ `
		SELECT id, title, created_at FROM notes
		ORDER BY created_at DESC
	`;
	const result = await c.env.DB.prepare(query).all<{ id: string; title: string; }>();
	if (!result.success) {
		throw new Error('Failed to get notes');
	}
	const notes = result.results;
	return notes;
}
