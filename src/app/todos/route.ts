import { todos } from "./todos";

export async function GET() {
	return Response.json(todos);
}
