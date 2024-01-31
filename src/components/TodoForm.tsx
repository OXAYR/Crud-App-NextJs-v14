// components/TodoForm.tsx
import { useState, FormEvent } from "react";
import axios from "axios";

interface TodoFormProps {
	onSubmit: (newTodo: Todo) => void;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
	const [text, setText] = useState<string>("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const response = await axios.post<{ todo: Todo }>("/api/todos", { text });
			const newTodo = response.data.todo;
			onSubmit(newTodo);
			setText("");
		} catch (error) {
			console.error("Error adding todo:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Enter a new todo"
			/>
			<button type="submit">Add Todo</button>
		</form>
	);
}
