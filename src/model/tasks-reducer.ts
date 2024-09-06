import { v1 } from "uuid"
import { TasksStateType } from "../App"

export const tasksReducer = (state: TasksStateType, action: tasksReducerActionType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASKS': {
			// const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
			// setTasks(newTodolistTasks)
			const newTodolistTasks = {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
			return newTodolistTasks
		} 
		case 'ADD-TASK': {
			// const newTask = {
			// 	id: v1(),
			// 	title: title,
			// 	isDone: false
			// }
			// const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
			// setTasks(newTodolistTasks) 
			const newTask = {
				id: v1(),
				title: action.payload.title,
				isDone: false
			}
			return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] }
		}
		case 'REMOVE-ALL-TASKS': {
			// delete tasks[todolistId]
			// setTasks({...tasks})
			delete state[action.payload.todolistId]
			return {...state}
		}
		case 'ADD-EMPTY-TASKS': {
			// setTasks({...tasks, [todolistId]: []})
			return {...state, [action.payload.todolistId]: []}
		}
		case 'CHANGE-TASK-STATUS': {
			// const newTodolistTasks = {
			// 	...tasks,
			// 	[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
			// }
			// setTasks(newTodolistTasks)
			const newTodolistWithChangedStatusTask = {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(tl => tl.id === action.payload.taskId ? {...tl, isDone: action.payload.taskStatus} : tl)}
			return newTodolistWithChangedStatusTask
		}
		case 'UPDATE-TASK': {
		// 	const newTodolistTasks = {
		// 		...tasks,
		// 		[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
		// 	}
		// setTasks(newTodolistTasks)
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
		}
		default: return state
	}
}

type tasksReducerActionType = RemoveTaskACType | AddTaskACType | RemoveAllTaskACType | AddEmptyTaskACType | ChangeTaskStatusACType | UpdateTaskACType

type RemoveTaskACType = {
	type: 'REMOVE-TASKS' 
	payload: {
		taskId: string 
		todolistId: string
	}
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
	return {
		type: 'REMOVE-TASKS', 
		payload: {
			taskId, 
			todolistId
		}
	} as const
}

type AddTaskACType = {
	type: 'ADD-TASK' 
	payload: {
		title: string 
		todolistId: string
	}
}

export const addTaskAC = (title: string, todolistId: string) => {
	return {
		type: 'ADD-TASK', 
		payload: {
			title, 
			todolistId
		}
	} as const
}

type RemoveAllTaskACType = {
	type: 'REMOVE-ALL-TASKS'
	payload: {
		todolistId: string
	}
}

export const removeAllTaskAC = (todolistId: string) => {
	return {
		type: 'REMOVE-ALL-TASKS', 
		payload: {
			todolistId
		}
	} as const
}

type AddEmptyTaskACType = {
	type: 'ADD-EMPTY-TASKS' 
	payload: {
		todolistId: string 
	}
}

export const addEmptyTaskAC = (todolistId: string) => {
	return {
		type: 'ADD-EMPTY-TASKS', 
		payload: {
			todolistId
		}
	} as const
}

type ChangeTaskStatusACType = {
	type: 'CHANGE-TASK-STATUS'
	payload: {
		taskId: string 
		taskStatus: boolean
		todolistId: string
	}
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string) => {
	return {
		type: 'CHANGE-TASK-STATUS',  
		payload: {
			taskId, 
			taskStatus, 
			todolistId
		}
	} as const
}

type UpdateTaskACType = {
	type: 'UPDATE-TASK'
	payload: {
		todolistId: string, 
		taskId: string, 
		title: string
	}
}

export const updateTaskAC = (todolistId: string, taskId: string, title: string) => {
	return {
		type: 'UPDATE-TASK', 
		payload: {
			todolistId, 
			taskId, 
			title
		}
	} as const
}