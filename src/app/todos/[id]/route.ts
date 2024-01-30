import { todos } from "../todos";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const todo = todos.find((todo) => todo.id === parseInt(params.id));
	return Response.json(todo);
}

