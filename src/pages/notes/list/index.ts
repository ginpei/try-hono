import { Context, Hono } from "hono";

type Env = {
	Bindings: {
		NOTES: KVNamespace;
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
	const keys = await c.env.NOTES.list();
	const notes: { id: string; title: string }[] = [];

	// 各キーに対してノートのデータを取得
	for (const key of keys.keys) {
		const note = await c.env.NOTES.get(key.name);
		if (note) {
			const noteData = JSON.parse(note);
			notes.push({ id: key.name, title: noteData.title });
		}
	}

	return notes;
}
