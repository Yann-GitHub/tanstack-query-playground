import axios from "axios"


// related to the reqres API docs
const userApi = axios.create({
    baseURL: 'https://reqres.in/api'
})

const getUsersPage = async (pageParam = 1) => {
    const response = await userApi.get(`/users?page=${pageParam}`)
    return response.data
}

export default { getUsersPage }