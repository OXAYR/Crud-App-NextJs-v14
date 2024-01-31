import { todos } from "../../todos";

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

	const updateIndex = todos.findIndex((todo) => todo.id === index);
	todos[updateIndex].text = text;
	return Response.json(todos);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;
	const index = parseInt(id);

	const deletedIndex = todos.findIndex((todo) => todo.id === index);
	const deletedComment = todos[deletedIndex];
	todos.splice(deletedIndex, 1);
	return Response.json(deletedComment);
}