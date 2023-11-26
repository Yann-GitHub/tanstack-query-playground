import axios from 'axios';

const api = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com"
})

const getPostsPage = async (pageParam = 1) => {
    const response = await api.get(`/posts?_page=${pageParam}&_limit=10`)
    return response.data
}

export default { getPostsPage }