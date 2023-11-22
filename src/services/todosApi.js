import axios from 'axios'

const todosApi = axios.create({
    baseURL: "http://localhost:3500"
})

// CRUD Actions

const getTodos = async () => {
    const response = await todosApi.get("/todos")
    return response.data
}

// Promises chaining syntax
// const getTodos = todosApi.get("/todos").then(response => { return response.data})

const addTodo = async (todo) => {
    return await todosApi.post("/todos", todo)
}

const updateTodo = async (todo) => {
    return await todosApi.patch(`/todos/${todo.id}`, todo)
}

const deleteTodo = async ({ id }) => {
    return await todosApi.delete(`/todos/${id}`, id)
}

export default { getTodos, addTodo, updateTodo, deleteTodo }