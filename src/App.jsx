import TodoList from "./features/todos/TodoList"
import UserListPaginated from "./features/pagination/pagination"
import PostListManual from "./features/infiniteFetching/PostListManual"
import { useState } from "react"

function App() {

  const [currentPage, setCurrentPage] = useState(<TodoList />)

  return (
    <>
    <div className="top-menu">
      <button className="button-topNav" onClick={() => setCurrentPage(<TodoList />)}>Todo List</button>
      <button className="button-topNav" onClick={() => setCurrentPage(<UserListPaginated />)}>User List Paginated</button>
      <button className="button-topNav" onClick={() => setCurrentPage(<PostListManual />)}>Post List manual</button>
    </div>
    {currentPage}
    {/* <Example2 /> */}
    {/* <TodoList /> */}
    </>
  )
}

export default App
