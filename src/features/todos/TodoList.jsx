import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { getTodos, addTodo, updateTodo, deleteTodo } from '../../services/todosApi'
import todoService from '../../services/todosApi'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('') // input newTodo
    const queryClient = useQueryClient() // Useful for invalidateQueries and refetch data

    const {
        isLoading,
        isError,
        error,
        data: todos,
    } = useQuery({
        queryKey:['todos'],
        queryFn: (obj) => {
            console.log(obj)
            return todoService.getTodos()
        },
        enabled: true, // only render query when you want or when a query depend from another one
        select: data => data.sort((a, b) => b.id - a.id), // Transform or select a part of the data return
        staleTime: 1000, // Set specificly on individual query
        // refetchInterval: 1000,

    })

    const updateTodoMutation = useMutation({
        mutationFn: updatedTodo => todoService.updateTodo(updatedTodo),
        onSuccess: () => {
            // Invalidates cache and refetch todos data
            queryClient.invalidateQueries(['todos'], {exact: true});
        },
    });

    const addTodoMutation = useMutation({
        mutationFn: newTodo => todoService.addTodo(newTodo),
        onSuccess: () => {
             // Invalidates cache and refetch todos data
            queryClient.invalidateQueries('todos');
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: todoId => todoService.deleteTodo(todoId),
        onSuccess: () => {
            // Invalidates cache and refetch todos data
            queryClient.invalidateQueries('todos');
        },
    });
    

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false})
        setNewTodo('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    let content
    
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p>{error.message}</p>
    } else {
        // content = JSON.stringify(todos, null, 2)
        content = todos.map((todo) => {
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodoMutation.mutate({ ...todo, completed: !todo.completed })
                            }
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    }
    
  return (
    <main>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
    </main>
  )
}

export default TodoList