import React, { useContext } from "react";



const TodoContext = React.createContext({
    todoList: [
        {
            id: 0,
            text: '',
            complete: false
        }
    ],
    filterValue: '',
    searchValue: '',
    addTodo: (_todo: string) => { },
    deleteTodo: (_id: number) => { },
    toggleTodo: (_id: number) => { },
    updateTodo: (_id: number, _todo: string) => { },
    filter: (_value: string) => { },
    search: (_value: string) => { }

})

export const TodoProvider = TodoContext.Provider

export default function useTodo() {
    return useContext(TodoContext)
}