import { todos } from "../todos";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const todo = todos.find((todo) => todo.id === parseInt(params.id));
	return Response.json(todo);
}


export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const body = await request.json();
	const { text } = body;
	const { id } = params;
	const index = parseInt(id);
	todos.splice(index, 0, { id: index, text });
}

