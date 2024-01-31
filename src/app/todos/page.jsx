// pages/todos/index.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TodosPage() {
	const [newTodoText, setNewTodoText] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/todos/api");
				console.log(response.data);
				setTodos(response.data);
			} catch (error) {
				console.error("Error fetching todos:", error);
			}
		};

		fetchData();
	}, []);

	const handleInputChange = (e) => {
		setNewTodoText(e.target.value);
	};

	const handleAddTodo = async () => {
		try {
			const response = await axios.post("/todos/api", { text: newTodoText });
			setTodos([...todos, response.data]);

			setNewTodoText("");
		} catch (error) {
			console.error("Error adding todo:", error);
		}
	};

	return (
		<>
			<div>
				<h1>Todos</h1>
				<input
					type="text"
					placeholder="Add a new todo"
					value={newTodoText}
					onChange={handleInputChange}
				/>
				<button onClick={handleAddTodo}>Add</button>
			</div>
			<div>
				<h1>Todos</h1>

				{todos ? (
					<ul>
						{todos.map((todo) => (
							<li key={todo.id}>{todo.text}</li>
						))}
					</ul>
				) : (
					<p>No todos available.</p>
				)}
			</div>
		</>
	);
}
