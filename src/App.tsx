import './App.css';
import {Todolist} from "./Todolist";
import {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './model/todolists-reducer';
import { addEmptyTaskAC, addTaskAC, changeTaskStatusAC, removeAllTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from './model/tasks-reducer';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	// let [todolists, setTodolists] = useState<TodolistType[]>([
	// 	{id: todolistID1, title: 'What to learn', filter: 'all'},
	// 	{id: todolistID2, title: 'What to buy', filter: 'all'},
	// ])
	let [todolists, dispatcTodolists] = useReducer(todolistsReducer, [
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	// let [tasks, setTasks] = useState<TasksStateType>({
	// 	[todolistID1]: [
	// 		{id: v1(), title: 'HTML&CSS', isDone: true},
	// 		{id: v1(), title: 'JS', isDone: true},
	// 		{id: v1(), title: 'ReactJS', isDone: false},
	// 	],
	// 	[todolistID2]: [
	// 		{id: v1(), title: 'Rest API', isDone: true},
	// 		{id: v1(), title: 'GraphQL', isDone: false},
	// 	],
	// })
	let [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

	const removeTask = (taskId: string, todolistId: string) => {
		dispatchTasks(removeTaskAC(taskId, todolistId))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatchTasks(addTaskAC(title, todolistId))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatchTasks(changeTaskStatusAC(taskId, taskStatus, todolistId))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		dispatcTodolists(changeFilterAC(filter, todolistId))
	}

	const removeTodolist = (todolistId: string) => {
		dispatcTodolists(removeTodolistAC(todolistId))
		dispatchTasks(removeAllTaskAC(todolistId))
	}

	const addTodolist = (title: string) => { 
		const todolistId = v1()
		dispatcTodolists(addTodolistAC(todolistId, title))
		dispatchTasks(addEmptyTaskAC(todolistId))
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatchTasks(updateTaskAC(todolistId, taskId, title))
	}

	const updateTodolist = (todolistId: string, title: string) => {
		dispatcTodolists(updateTodolistAC(todolistId, title))
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>
			{todolists.map((tl) => {

				const allTodolistTasks = tasks[tl.id]
				let tasksForTodolist = allTodolistTasks

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
				}

				return <Todolist
					key={tl.id}
					todolistId={tl.id}
					title={tl.title}
					tasks={tasksForTodolist}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					filter={tl.filter}
					removeTodolist={removeTodolist}
					updateTask={updateTask}
					updateTodolist={updateTodolist}
				/>
			})}
		</div>
	);
}

export default App;
