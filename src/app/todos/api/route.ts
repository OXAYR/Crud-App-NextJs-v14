import { todos } from "../todos";

export async function GET() {
	return Response.json(todos);
}

export async function POST(request: Request) {
	const todo = await request.json();
	const newTodo = {
		id: todos.length + 1,
		text: todo.text,
	};
	todos.push(newTodo);
	return new Response(JSON.stringify(newTodo), {
		headers: {
			"Content-Type": "application/json",
		},
		status: 201,
	});
}
