// pages/todos/index.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

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
			<div className="bg-gray-200 p-4">
				<h1 className="text-3xl font-bold mb-4">Todos</h1>
				<div className="flex space-x-2">
					<input
						type="text"
						placeholder="Add a new todo"
						value={newTodoText}
						onChange={handleInputChange}
						className="border border-gray-300 p-2 flex-grow"
					/>
					<button
						onClick={handleAddTodo}
						className="bg-blue-500 text-white px-4 py-2"
					>
						Add
					</button>
				</div>
			</div>
			<div className="mt-8">
				<h1 className="text-2xl font-semibold mb-4">Todo List</h1>
				{todos.length > 0 ? (
					<ul className="list-disc pl-8">
						{todos.map((todo) => (
							<li
								key={todo.id}
								className="text-gray-700"
							>
								{todo.text}
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">No todos available.</p>
				)}
			</div>
		</>
	);
}
