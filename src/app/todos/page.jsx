// pages/todos/index.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function TodosPage() {
	const [newTodoText, setNewTodoText] = useState("");
	const [todos, setTodos] = useState([]);
	const [editingTodoId, setEditingTodoId] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/todos/api");
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

	const handleDeleteTodo = async (id) => {
		try {
			await axios.delete(`/todos/api/${id}`);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const handleEditTodo = async (id, newText) => {
		try {
			await axios.patch(`/todos/api/${id}`, { text: newText });
			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === id ? { ...todo, text: newText } : todo
				)
			);
			setEditingTodoId(null);
		} catch (error) {
			console.error("Error editing todo:", error);
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
			<div className="mt-8 flex flex-col items-center">
				<h1 className="text-2xl font-semibold mb-4">Todo List</h1>
				{todos.length > 0 ? (
					<ul className="list-disc w-2/4">
						{todos.map((todo) => (
							<li
								key={todo.id}
								className="text-gray-700 flex items-center justify-between"
							>
								{editingTodoId === todo.id ? (
									<>
										<input
											type="text"
											value={newTodoText}
											onChange={(e) => setNewTodoText(e.target.value)}
											className="border border-gray-300 p-2 flex-grow"
										/>
										<button
											onClick={() => handleEditTodo(todo.id, newTodoText)}
											className="bg-green-500 text-white px-2 py-1 mr-4"
										>
											Save
										</button>
									</>
								) : (
									<>
										{todo.text}
										<div>
											<button
												onClick={() => setEditingTodoId(todo.id)}
												className="text-blue-500 mx-2"
											>
												Edit
											</button>
											<button
												onClick={() => handleDeleteTodo(todo.id)}
												className="text-red-500"
											>
												Delete
											</button>
										</div>
									</>
								)}
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
