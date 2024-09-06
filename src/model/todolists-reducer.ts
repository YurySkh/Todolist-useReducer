import { FilterValuesType, TodolistType } from "../App";

export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.payload.todolistId)
		} 
		case 'ADD-TODOLIST': { 
				// const newTodolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
				// setTodolists([newTodolist, ...todolists])
				const newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
				return ([newTodolist, ...state])
		} 
		case 'CHANGE-FILTER': {
			// const newTodolists = todolists.map(tl => {
			// 	return tl.id === todolistId ? {...tl, filter} : tl
			// })
			// setTodolists(newTodolists)
			return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
		}
		case 'UPDATE-TODOLIST': {
			// const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
		// setTodolists(newTodolists)
			return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
		}
		default: return state
	}
}

type TodolistsReducerActionsType = RemoveTodolistACType | AddTodolistACType | ChangeFilterType | UpdateTodolistACType

type RemoveTodolistACType = {
	type: 'REMOVE-TODOLIST', 
	payload: {
		todolistId: string
	}
}

export const removeTodolistAC = (todolistId: string) => {
	return {
		type: 'REMOVE-TODOLIST', 
		payload: {
			todolistId
		}
	} as const
}

type AddTodolistACType = {
	type: 'ADD-TODOLIST', 
	payload: {
		todolistId: string
		title: string
	}
}

export const addTodolistAC = (todolistId: string, title: string) => {
	return {
		type: 'ADD-TODOLIST', 
		payload: {
			todolistId, 
			title
		}
	} as const

}

type ChangeFilterType = {
	type: 'CHANGE-FILTER', 
	payload: {
		filter: FilterValuesType, 
		todolistId: string
	}
}

export const changeFilterAC = (filter: FilterValuesType, todolistId: string) => {
	return {
		type: 'CHANGE-FILTER', 
		payload: {
			filter, 
			todolistId
		}
	} as const 
}

type UpdateTodolistACType = {
	type: 'UPDATE-TODOLIST', 
	payload: {
		todolistId: string,
		title: string
	}
}

export const updateTodolistAC = (todolistId: string, title: string) => {
	return {
		type: 'UPDATE-TODOLIST', 
		payload: {
			todolistId, 
			title
		}
	} as const 
}